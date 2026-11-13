#!/bin/bash
# Publishes the current Expo tunnel address to GitHub Pages (docs/tunnel.json),
# which the NOVA home-screen launcher reads. Expo SDK 58 tunnels get a NEW random
# hostname on every start (*.on.expo.app), so this runs after every nova-consumer start.
exec 9>/tmp/nova-tunnel-git.lock; flock -w 120 9 || { echo "$(date): could not get git lock"; exit 1; }
cd /home/ubuntu/nova-consumer || exit 1

HOST=""
for i in $(seq 1 30); do
  HOST=$(journalctl -u nova-consumer -b --no-pager -o cat 2>/dev/null \
         | grep -oE 'Waiting on https?://[a-z0-9.-]+\.on\.expo\.app' | tail -1 | sed -E 's#.*://##')
  if [ -n "$HOST" ] && curl -fsS -m 15 -o /dev/null -H 'Accept: application/expo+json' -H 'Expo-Platform: ios' "https://$HOST/"; then
    break
  fi
  HOST=""
  sleep 4
done

if [ -z "$HOST" ]; then
  echo "$(date): No working tunnel found"
  exit 1
fi

EXPO_URL="exp://$HOST"
echo "$(date): Tunnel URL is $EXPO_URL"
echo "{\"url\":\"$EXPO_URL\"}" > docs/tunnel.json

if ! git diff --quiet docs/tunnel.json 2>/dev/null; then
  git add docs/tunnel.json
  git commit -q -m "Update tunnel URL" -- docs/tunnel.json
  git push origin main
  echo "$(date): Pushed new tunnel URL"
else
  echo "$(date): URL unchanged"
fi
flock -u 9; bash /home/ubuntu/nova-preflight/warm.sh 8082
