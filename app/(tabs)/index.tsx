import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import { collection, onSnapshot, orderBy, query, doc, updateDoc, increment } from 'firebase/firestore';
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

  const handleLike = async (id: string) => {
    await updateDoc(doc(db, 'outfits', id), { likes: increment(1) });
  };

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
              <View style={styles.cardHeader}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>
                    {item.userEmail ? item.userEmail[0].toUpperCase() : '?'}
                  </Text>
                </View>
                <Text style={styles.userName}>{item.userEmail?.split('@')[0]}</Text>
              </View>
              <Text style={styles.styleTag}>#{item.style}</Text>
              <TouchableOpacity style={styles.likeButton} onPress={() => handleLike(item.id)}>
                <Text style={styles.likeText}>❤️ {item.likes}</Text>
              </TouchableOpacity>
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
  header: { fontSize: 26, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  card: { margin: 12, borderRadius: 16, backgroundColor: '#fff', overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  cardImage: { width: '100%', height: 320 },
  cardImagePlaceholder: { width: '100%', height: 320, backgroundColor: '#f0f0f0' },
  cardInfo: { padding: 14 },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', marginRight: 8 },
  avatarText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  userName: { fontSize: 14, fontWeight: '600', color: '#333' },
  styleTag: { fontSize: 15, color: '#555', marginBottom: 10 },
  likeButton: { flexDirection: 'row', alignItems: 'center' },
  likeText: { fontSize: 15, color: '#333' },
  empty: { textAlign: 'center', color: '#aaa', marginTop: 60, fontSize: 15 },
});