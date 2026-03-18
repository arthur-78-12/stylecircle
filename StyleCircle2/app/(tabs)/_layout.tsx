import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const outfits = [
  { id: '1', user: 'Sophie', style: 'Streetwear', likes: 42 },
  { id: '2', user: 'Lucas', style: 'Minimaliste', likes: 28 },
  { id: '3', user: 'Emma', style: 'Vintage', likes: 65 },
];

export default function FeedScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>StyleCircle</Text>
      <FlatList
        data={outfits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardImage} />
            <View style={styles.cardInfo}>
              <Text style={styles.userName}>{item.user}</Text>
              <Text style={styles.styleTag}>{item.style}</Text>
              <Text style={styles.likes}>❤️ {item.likes}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  card: { flexDirection: 'row', margin: 12, borderRadius: 12, backgroundColor: '#f9f9f9', overflow: 'hidden' },
  cardImage: { width: 100, height: 120, backgroundColor: '#ddd' },
  cardInfo: { padding: 12, justifyContent: 'center' },
  userName: { fontSize: 16, fontWeight: 'bold' },
  styleTag: { fontSize: 13, color: '#888', marginTop: 4 },
  likes: { fontSize: 13, marginTop: 8 },
});