import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";

 const firebaseConfig = {
 apiKey: "AIzaSyDZZZVZyVf2kBFlsraWzgb-frcL2Im8qxk",
 authDomain: "novo-test-c620e.firebaseapp.com",
 projectId: "novo-test-c620e",
 storageBucket: "novo-test-c620e.appspot.com",
 messagingSenderId: "165155012476",
 appId: "1:165155012476:web:94207d8b96cc0f2785aef9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(app);
// Create a storage reference from our storage service
const storageRef = ref(storage);
  // Add event listeners to dropzone elements
const dropzones = document.querySelectorAll('.dropzone');

dropzones.forEach(function (dropzone) {
  dropzone.addEventListener('click', function () {
    const fileInput = dropzone.querySelector('.fileInput');
    fileInput.click();
  });

  dropzones.forEach(function (dropzone) {
    dropzone.addEventListener('click', function () {
      const fileInput = dropzone.querySelector('.fileInput');
      fileInput.click();
    });
  
    dropzone.addEventListener('change', function (e) {
      const file = e.target.files[0];
      const memberId = dropzone.id;
      const storageRef = ref(storage, 'leadersJuventude/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.then((snapshot) => {
        getDownloadURL(snapshot.ref).then((downloadURL) => {
          dropzone.style.backgroundImage = `url(${downloadURL})`;
          
          // Save the image URL to Firestore
          const memberRef = doc(db, 'juventude', memberId);
          setDoc(memberRef, { imageURL: downloadURL });
        });
      }).catch((error) => {
        console.log('Error uploading image:', error);
      });
    });
  
    // Retrieve the image URL from Firestore
    const memberId = dropzone.id;
    const memberRef = doc(db, 'juventude', memberId);
    getDoc(memberRef).then((docSnapshot) => {
      if (docSnapshot.exists()) {
        const { imageURL } = docSnapshot.data();
        dropzone.style.backgroundImage = `url(${imageURL})`;
      }
    });
  })
})