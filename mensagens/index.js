
 'use strict';

 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
 import {
   getAuth,
   onAuthStateChanged,
 } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";
 import {
   getFirestore,
   collection,
   addDoc,
   query,
   orderBy,
   limit,
   onSnapshot,
   setDoc,
   updateDoc,
   doc,
   serverTimestamp,
 } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-firestore.js";
 import {
   getStorage,
   ref,
   uploadBytesResumable,
   getDownloadURL,
 } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-storage.js";
 import {
   getMessaging,
   getToken,
   onMessage
 } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-messaging.js";
 import { getPerformance } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-performance.js";

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
 const auth = getAuth(app);
 const storage = getStorage(app);


//  // Returns the signed-in user's profile Pic URL.

//  function getProfilePicUrl() {
//    return getAuth().currentUser.photoURL || '/images/profile_placeholder.png';
//  }

//  // Returns the signed-in user's display name.
//  function getUserName() {
//    return getAuth().currentUser.displayName;
//  }

//  // Returns true if a user is signed-in.
//  function isUserSignedIn() {
//    return !!getAuth().currentUser;
//  }

 // Saves a new message to Cloud Firestore.

 const checkAuthState = async() =>{
  onAuthStateChanged(auth, user =>{
      if(user){  
                        const user = auth.currentUser;
                        const displayName = user.displayName;
                        const email = user.email;
                        const photoURL = user.photoURL;
                        const emailVerified = user.emailVerified;
                        console.log(email, displayName,photoURL, emailVerified)


          async function saveMessage() {
            const messageText = document.getElementById('message-input').value;
                // Add a new message entry to the Firebase database.
                try {
                  await addDoc(collection(db, "Mensagens"), {
                    name: displayName,
                    text: messageText,
                    profilePicUrl: photoURL,
                    timestamp: new Date().toISOString(),
                  });
                }
                catch(error) {
                  console.error('Error writing new message to Firebase Database', error);
                }
              }
              document.getElementById('send-button').addEventListener('click', saveMessage);

              // Saves a new message containing an image in Firebase.
              // This first saves the image in Firebase storage.
              async function saveImageMessage(file) {
                try {
                  // 1 - We add a message with a loading icon that will get updated with the shared image.
                  const messageRef = await addDoc(collection(getFirestore(), 'messages'), {
                    name: displayName,
                    imageUrl: LOADING_IMAGE_URL,
                    profilePicUrl: photoURL,
                    timestamp: serverTimestamp()
                  });

                  // 2 - Upload the image to Cloud Storage.
                  const filePath = `${getAuth().currentUser.uid}/${messageRef.id}/${file.name}`;
                  const newImageRef = ref(getStorage(), filePath);
                  const fileSnapshot = await uploadBytesResumable(newImageRef, file);

                  // 3 - Generate a public URL for the file.
                  const publicImageUrl = await getDownloadURL(newImageRef);

                  // 4 - Update the chat message placeholder with the image’s URL.
                  await updateDoc(messageRef,{
                    imageUrl: publicImageUrl,
                    storageUri: fileSnapshot.metadata.fullPath
                  });
                } catch (error) {
                  console.error('There was an error uploading a file to Cloud Storage:', error);
                }
              }

              // Saves the messaging device token to Cloud Firestore.
              async function saveMessagingDeviceToken() {
                try {
                  const currentToken = await getToken(getMessaging());
                  if (currentToken) {
                    console.log('Got FCM device token:', currentToken);
                    // Saving the Device Token to Cloud Firestore.
                    const tokenRef = doc(getFirestore(), 'fcmTokens', currentToken);
                    await setDoc(tokenRef, { uid: getAuth().currentUser.uid });

                    // This will fire when a message is received while the app is in the foreground.
                    // When the app is in the background, firebase-messaging-sw.js will receive the message instead.
                    onMessage(getMessaging(), (message) => {
                      console.log(
                        'New foreground notification from Firebase Messaging!',
                        message.notification
                      );
                    });
                  } else {
                    // Need to request permissions to show notifications.
                    requestNotificationsPermissions();
                  }
                } catch(error) {
                  console.error('Unable to get messaging token.', error);
                };
              }

              // Requests permissions to show notifications.
              async function requestNotificationsPermissions() {
                console.log('Requesting notifications permission...');
                const permission = await Notification.requestPermission();

                if (permission === 'granted') {
                  console.log('Notification permission granted.');
                  // Notification permission granted.
                  await saveMessagingDeviceToken();
                } else {
                  console.log('Unable to get permission to notify.');
                }
              }

              // Triggered when a file is selected via the media picker.
              function onMediaFileSelected(event) {
                event.preventDefault();
                var file = event.target.files[0];

                // Clear the selection in the file picker input.
                imageFormElement.reset();

                // Check if the file is an image.
                if (!file.type.match('image.*')) {
                  var data = {
                    message: 'You can only share images',
                    timeout: 2000
                  };
                  signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
                  return;
                }
                // Check if the user is signed-in
                if (checkSignedInWithMessage()) {
                  saveImageMessage(file);
                }
              }

              // Triggered when the send new message form is submitted.
              function onMessageFormSubmit(e) {
                e.preventDefault();
                // Check that the user entered a message and is signed in.
                if (messageInputElement.value && checkSignedInWithMessage()) {
                  saveMessage(messageInputElement.value).then(function() {
                    // Clear message text field and re-enable the SEND button.
                    resetMaterialTextfield(messageInputElement);
                    toggleButton();
                  });
                }
              }

              // Triggers when the auth state change for instance when the user signs-in or signs-out.
              function authStateObserver(user) {
                if (user) { // User is signed in!
                  // Get the signed-in user's profile pic and name.
                  var profilePicUrl = user.photoURL;
                  var userName = user.displayName;

                  // Set the user's profile pic and name.
                  userPicElement.style.backgroundImage = 'url(' + addSizeToGoogleProfilePic(profilePicUrl) + ')';
                  userNameElement.textContent = userName;

                  // Show user's profile and sign-out button.
                  userNameElement.removeAttribute('hidden');
                  userPicElement.removeAttribute('hidden');
                  signOutButtonElement.removeAttribute('hidden');

                  // Hide sign-in button.
                  signInButtonElement.setAttribute('hidden', 'true');

                  // We save the Firebase Messaging Device token and enable notifications.
                  saveMessagingDeviceToken();
                } else { // User is signed out!
                  // Hide user's profile and sign-out button.
                  userNameElement.setAttribute('hidden', 'true');
                  userPicElement.setAttribute('hidden', 'true');
                  signOutButtonElement.setAttribute('hidden', 'true');

                  // Show sign-in button.
                  signInButtonElement.removeAttribute('hidden');
                }
              }

              // Returns true if user is signed-in. Otherwise false and displays a message.
              function checkSignedInWithMessage() {
                // Return true if the user is signed in Firebase
                if (isUserSignedIn()) {
                  return true;
                }

                // Display a message to the user using a Toast.
                var data = {
                  message: 'You must sign-in first',
                  timeout: 2000
                };
                signInSnackbarElement.MaterialSnackbar.showSnackbar(data);
                return false;
              }

              // Resets the given MaterialTextField.
              function resetMaterialTextfield(element) {
                element.value = '';
                element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
              }

              // // Template for messages.
              // var MESSAGE_TEMPLATE =
              //     '<div class="message-container">' +
              //       '<div class="spacing"><div class="pic"></div></div>' +
              //       '<div class="message"></div>' +
              //       '<div class="name"></div>' +
              //     '</div>';

              // Adds a size to Google Profile pics URLs.
              function addSizeToGoogleProfilePic(url) {
                if (url.indexOf('googleusercontent.com') !== -1 && url.indexOf('?') === -1) {
                  return url + '?sz=150';
                }
                return url;
              }

              // A loading image URL.
              let LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

              // Delete a Message from the UI.
              function deleteMessage(id) {
                var div = document.getElementById(id);
                // If an element for that message exists we delete it.
                if (div) {
                  div.parentNode.removeChild(div);
                }
              }
              var MESSAGE_TEMPLATE =
              '<div class="message-container">' +
                '<div class="spacing"><div class="pic"></div></div>' +
                '<div class="message"></div>' +
                '<div class="name"></div>' +
              '</div>';


                  function createAndInsertMessage(id, timestamp) {
                    const container = document.createElement('div');
                    container.innerHTML = MESSAGE_TEMPLATE;
                    const div = container.firstChild;
                    div.setAttribute('id', id);

                    // If timestamp is null, assume we've gotten a brand new message.
                    // https://stackoverflow.com/a/47781432/4816918
                    timestamp = timestamp ? timestamp.toMillis() : Date.now();
                    div.setAttribute('timestamp', timestamp);
                    // // figure out where to insert new message
                    // const existingMessages = messageListElement.children;
                    // if (existingMessages.length === 0) {
                    //   messageListElement.appendChild(div);
                    // } else {
                    //   let messageListNode = existingMessages[0];

                    //   while (messageListNode) {
                    //     const messageListNodeTime = messageListNode.getAttribute('timestamp');

                    //     if (!messageListNodeTime) {
                    //       throw new Error(
                    //         `Child ${messageListNode.id} has no 'timestamp' attribute`
                    //       );
                    //     }

                    //     if (messageListNodeTime > timestamp) {
                    //       break;
                    //     }

                    //     messageListNode = messageListNode.nextSibling;
                    //   }

                    //   messageListElement.insertBefore(div, messageListNode);
                    // }

                    return div;
                  }
// Example usage assuming you have access to the authenticated user object
                // Displays a Message in the UI.
                function displayMessage(id, timestamp, name, text, isUserMessage,) {
                  const messageContainer = document.getElementById('chat-messages');
                  const messageElement = document.createElement('div');
                  messageElement.classList.add('message');
                  if (isUserMessage) {
                    messageElement.classList.add('sent');
                  } else {
                    messageElement.classList.add('received');
                    const user = auth.currentUser;
                    const photoURL = user.photoURL;
                    if (photoURL){  
                      console.log(photoURL)
                      // Create an img element for received messages
                      const imgElement = document.createElement('img');
                      imgElement.src = photoURL; // Set the src attribute to the photoURL
                      imgElement.classList.add('profPic');
                      console.log(imgElement)
                      messageElement.appendChild(imgElement);
                      console.log(messageElement) // Append the img element to the message container
                      imgElement.onload = function() {
                      console.log('Image loaded');
                    };
                      }
                  }
                  // messageElement.innerHTML = `
                
                  //   <div class="text">${text}</div> 
                  //   <div class="name">${name}</div>
                  //   <div class="timestamp">${timestamp}</div>
                  // `;
                
                // Append the message element to the message container
                messageContainer.appendChild(messageElement);
                // Scroll to the bottom of the message container to show the latest message
                messageContainer.scrollTop = messageContainer.scrollHeight;
                  if (text) { // If the message is text.
                    messageElement.textContent = text;
                    // Replace all line breaks by <br>.
                    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
                  } else if (imageUrl) { // If the message is an image.
                    var image = document.createElement('img');
                    image.addEventListener('load', function() {
                    });
                    image.src = imageUrl + '&' + new Date().getTime();
                    messageElement.innerHTML = '';
                    messageElement.appendChild(image);
                  }
                }

                // Enables or disables the submit button depending on the values of the input
                // fields.
                function toggleButton() {
                  if (messageInputElement.value) {
                    submitButtonElement.removeAttribute('disabled');
                  } else {
                    submitButtonElement.setAttribute('disabled', 'true');
                  }
                }
              // Loads chat messages history and listens for upcoming ones.
              function loadMessages() {
                // Create the query to load the last 12 messages and listen for new ones.
                const messagesCollection = collection(getFirestore(), "Mensagens");
                const recentMessagesQuery = query(messagesCollection,orderBy("timestamp", "asc") // Fetch messages in ascending order of timestamp
                );
                // Start listening to the query.
                onSnapshot(recentMessagesQuery, (snapshot) => {
                  snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") { // Only handle added messages
                      const message = change.doc.data();
                      const isUserMessage = message.name == displayName;
                      console.log(displayName) // Se o nome de quem enviou for igual ao nome da conta, então é mensagem do usuário
                      displayMessage(
                        change.doc.id,
                        message.timestamp,
                        message.name,
                        message.text,
                        isUserMessage,
                        message.photoURL,
                          )
                        }
                  });
                });
              }
getPerformance();
loadMessages();
createAndInsertMessage();
// -------------------------------------------------------------------------------------------------------------------
                    }
                    else{
                    //  window.location.assign("/login/login.html")
                    }
                })
              }

              const userSignOut = async() =>{
                await signOut(auth)
              }
              checkAuthState();






//  function createAndInsertMessage(id, timestamp) {
//    const container = document.createElement('div');
//    container.innerHTML = MESSAGE_TEMPLATE;
//    const div = container.firstChild;
//    div.setAttribute('id', id);
//    // If timestamp is null, assume we've gotten a brand new message.
//    // https://stackoverflow.com/a/47781432/4816918

//    div.setAttribute('timestamp', timestamp);

//    // figure out where to insert new message
//    const existingMessages = messageListElement.children;
//    if (existingMessages.length === 0) {
//      messageListElement.appendChild(div);
//    } else {
//      let messageListNode = existingMessages[0];

//      while (messageListNode) {
//        const messageListNodeTime = messageListNode.getAttribute('timestamp');

//        if (!messageListNodeTime) {
//          throw new Error(
//            `Child ${messageListNode.id} has no 'timestamp' attribute`
//          );
//        }

//        if (messageListNodeTime > timestamp) {
//          break;
//        }

//        messageListNode = messageListNode.nextSibling;
//      }

//      messageListElement.insertBefore(div, messageListNode);
//    }

//    return div;
//  }



//  // Shortcuts to DOM Elements.
//  var messageListElement = document.getElementById('messages');
//  var messageFormElement = document.getElementById('message-form');
//  var messageInputElement = document.getElementById('message');
//  var submitButtonElement = document.getElementById('submit');
//  var imageButtonElement = document.getElementById('submitImage');
//  var imageFormElement = document.getElementById('image-form');
//  var mediaCaptureElement = document.getElementById('mediaCapture');
//  var userPicElement = document.getElementById('user-pic');
//  var userNameElement = document.getElementById('user-name');
//  var signInButtonElement = document.getElementById('sign-in');
//  var signOutButtonElement = document.getElementById('sign-out');
//  var signInSnackbarElement = document.getElementById('must-signin-snackbar');

//  // Saves message on form submit.
//  messageFormElement.addEventListener('submit', onMessageFormSubmit);
//  signOutButtonElement.addEventListener('click', signOutUser);
//  signInButtonElement.addEventListener('click', signIn);

//  // Toggle for the button.
//  messageInputElement.addEventListener('keyup', toggleButton);
//  messageInputElement.addEventListener('change', toggleButton);

 // Events for image upload.
//  imageButtonElement.addEventListener('click', function(e) {
//    e.preventDefault();
//    mediaCaptureElement.click();
//  });
//  mediaCaptureElement.addEventListener('change', onMediaFileSelected);

