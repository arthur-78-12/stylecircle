import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function FeedScreen() {
  const [outfits, setOutfits] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'outfits'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setOutfits(data);
    });
    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>StyleCircle</Text>
      <FlatList
        data={outfits}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            {item.imageBase64 ? (
              <Image source={{ uri: item.imageBase64 }} style={styles.cardImage} />
            ) : (
              <View style={styles.cardImagePlaceholder} />
            )}
            <View style={styles.cardInfo}>
              <Text style={styles.styleTag}>{item.style}</Text>
              <Text style={styles.userName}>{item.userEmail}</Text>
              <Text style={styles.likes}>❤️ {item.likes}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.empty}>Aucun outfit publié pour l'instant</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60 },
  header: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  card: { flexDirection: 'row', margin: 12, borderRadius: 12, backgroundColor: '#f9f9f9', overflow: 'hidden' },
  cardImage: { width: 100, height: 120 },
  cardImagePlaceholder: { width: 100, height: 120, backgroundColor: '#ddd' },
  cardInfo: { padding: 12, justifyContent: 'center' },
  styleTag: { fontSize: 16, fontWeight: 'bold' },
  userName: { fontSize: 13, color: '#888', marginTop: 4 },
  likes: { fontSize: 13, marginTop: 8 },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 60, fontSize: 15 },
});