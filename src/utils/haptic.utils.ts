import * as Haptics from 'expo-haptics';

export const handleHaptictFeedback = () => {
  // Trigger medium impact haptic feedback
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};
