import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../config/firebase';

export default function PublishScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [base64Image, setBase64Image] = useState('');
  const [style, setStyle] = useState('');
  const [loading, setLoading] = useState(false);

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission refusée', 'Autorisez l\'accès à la galerie.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.1,
      base64: true,
      allowsEditing: true,
      aspect: [4, 5],
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setBase64Image(result.assets[0].base64 || '');
    }
  };

  const publish = async () => {
    if (!image || !style) {
      Alert.alert('Incomplet', 'Ajoutez une photo et un style.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'outfits'), {
        imageBase64: `data:image/jpeg;base64,${base64Image}`,
        style,
        userId: auth.currentUser?.uid,
        userEmail: auth.currentUser?.email,
        likes: 0,
        createdAt: serverTimestamp(),
      });

      Alert.alert('Publié !', 'Votre outfit a été publié.');
      setImage(null);
      setBase64Image('');
      setStyle('');
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Erreur', error.message);
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Publier un outfit</Text>
      <TouchableOpacity style={styles.imageBox} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text style={styles.imageBoxText}>+ Ajouter une photo</Text>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Décris ton style (ex: Streetwear, Vintage...)"
        placeholderTextColor="#999"
        value={style}
        onChangeText={setStyle}
      />
      <TouchableOpacity style={styles.button} onPress={publish} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Publication...' : 'Publier'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 60, paddingHorizontal: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 30 },
  imageBox: { height: 200, borderRadius: 12, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center', marginBottom: 20, overflow: 'hidden' },
  imageBoxText: { fontSize: 16, color: '#999' },
  image: { width: '100%', height: '100%' },
  input: { borderWidth: 1, borderColor: '#eee', borderRadius: 12, padding: 14, fontSize: 15, backgroundColor: '#f9f9f9', marginBottom: 20 },
  button: { backgroundColor: '#000', borderRadius: 12, padding: 16, alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});