import { useState, ChangeEvent, useEffect } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from 'uuid';
import Sheet from 'react-modal-sheet'

function App() {
  const [imageUpload, setImageUpload] = useState<File | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);

  const [isOpen, setOpen] = useState(false)

  const imageListRef = ref(storage, "images/");

  const uploadImage = () => {
    if (imageUpload === null) return;

    const imageRef = ref(storage, `images/${uuidv4()}_${imageUpload.name}`);

    uploadBytes(imageRef, imageUpload)
      .then(() => getDownloadURL(imageRef))
      .then((url) => {
        setImageList((prev) => (prev ? [...prev, url] : [url]));
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });
  };

  console.log(imageList)

  return (
    <>
      <div>
        <input
          type="file"
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files;
            if (files && files.length > 0) {
              setImageUpload(files[0]);
            }
          }}
        />
        <button onClick={uploadImage}>Upload</button>
        Hello
      </div>
    </>
  );
}

export default App;
