import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { FullWindowOverlay } from "react-native-screens";

export default function Reproduction() {
  const [parentOpen, setParentOpen] = useState(false);
  const [childOpen, setChildOpen] = useState(false);
  const [cycles, setCycles] = useState(0);

  const closeParent = () => {
    setChildOpen(false);
    setParentOpen(false);
    setCycles((current) => current + 1);
  };

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>FullWindowOverlay sibling reproduction</Text>
      <Text style={styles.counter}>Completed parent cycles: {cycles}</Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => setParentOpen(true)}
        style={styles.primaryButton}
      >
        <Text style={styles.primaryButtonText}>Open parent overlay</Text>
      </Pressable>

      {parentOpen ? (
        <FullWindowOverlay>
          <View style={styles.parentBackdrop}>
            <View style={styles.parentCard}>
              <Text style={styles.cardTitle}>Parent overlay</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setChildOpen(true)}
                style={styles.childButton}
              >
                <Text>Open child overlay</Text>
              </Pressable>
              <Pressable
                accessibilityRole="button"
                onPress={closeParent}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close parent overlay</Text>
              </Pressable>
            </View>
          </View>
        </FullWindowOverlay>
      ) : null}

      {childOpen ? (
        <FullWindowOverlay>
          <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
            <View style={styles.childCard}>
              <Text style={styles.childTitle}>Child overlay</Text>
              <Pressable
                accessibilityRole="button"
                onPress={() => setChildOpen(false)}
                style={styles.option}
              >
                <Text>Close child overlay</Text>
              </Pressable>
            </View>
          </View>
        </FullWindowOverlay>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    color: "#161616",
    fontSize: 22,
    fontWeight: "600",
    textAlign: "center",
  },
  counter: { color: "#666", marginBottom: 24, marginTop: 8 },
  primaryButton: {
    backgroundColor: "#2563eb",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  primaryButtonText: { color: "#fff", fontWeight: "600" },
  parentBackdrop: {
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.38)",
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  parentCard: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    width: "100%",
  },
  cardTitle: {
    color: "#161616",
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 20,
  },
  childButton: {
    borderColor: "#d4d4d4",
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
  },
  closeButton: { alignSelf: "flex-start", marginTop: 20, paddingVertical: 8 },
  closeButtonText: { color: "#2563eb", fontWeight: "600" },
  childCard: {
    alignSelf: "center",
    backgroundColor: "#f97316",
    borderRadius: 20,
    marginTop: 540,
    padding: 20,
    width: 260,
  },
  childTitle: { color: "#fff", fontSize: 18, fontWeight: "700" },
  option: {
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 12,
    padding: 14,
  },
});
