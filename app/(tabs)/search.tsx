import { StyleSheet, Text, TextInput, View } from 'react-native';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recherche</Text>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un style, une pièce..."
        placeholderTextColor="#999"
      />
      <Text style={styles.hint}>Trouvez des looks par style, couleur ou pièce</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 14, fontSize: 15, backgroundColor: '#f9f9f9' },
  hint: { textAlign: 'center', color: '#aaa', marginTop: 40, fontSize: 14 },
});