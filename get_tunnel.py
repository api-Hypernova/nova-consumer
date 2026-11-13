import sys, json
d = json.load(sys.stdin)
for t in d["tunnels"]:
    if t["proto"] == "https":
        print(t["public_url"])
        break
