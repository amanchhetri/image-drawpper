import React, { useState } from 'react';
// import axios from 'axios';
import './App.css';

function App() {
    const [post, setPost] = useState({
        photos: []
    });

    const [highlight, setHighlight] = useState(false);
    const {photos} = post;

    const handleFileChange = e => {
        let files = e.target.files;
        handFiles(files);
    }

    const handFiles = files => {
        let photosArr = [];
        for(let file of files) {
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.addEventListener('load', () => {
                let fileobj = {
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    src: reader.result
                }
                photosArr.push(fileobj);
                setPost({
                    ...post,
                    photos: [...photos, ...photosArr]
                })
            })
        }
    }

    const handleDelete = e => {
        let target = e.target.parentElement;
        let targetIndex = target.dataset.imgindex * 1;
        setPost({
            ...post,
            photos: [...photos.slice(0, targetIndex), ...photos.slice(targetIndex + 1)]
        })
    }

    const handleHighlight = e => {
        e.preventDefault();
        e.stopPropagation();
        setHighlight(true);
    }

    const handleUnhighlight = e => {
        e.preventDefault();
        e.stopPropagation();
        setHighlight(false);
    }

    const handleDrop = e => {
        e.preventDefault();
        e.stopPropagation();
        setHighlight(false);
        let dt = e.dataTransfer;
        let files = dt.files;
        handFiles(files);
    }

  return (
    <div className="App">
      <div className="file-upload">
        <h2>Image Drawpper</h2>
        <form className="" encType= "multipart/form-data">
            <div className="custom-form-group">
                <div className={highlight ? "custom-file-drop-area highlight" : "custom-file-drop-area"} 
                    onDragEnter={handleHighlight} 
                    onDragOver={handleHighlight} 
                    onDragLeave={handleUnhighlight} 
                    onDrop={handleDrop}>
                    <input type="file"name="photos" placeholder="Enter photos" multiple id="filephotos" onChange={handleFileChange}/>
                    <label htmlFor="filephotos">Drag & Drop<br/> or <br/> Click to browse files</label>
                </div>
                <div className="custom-file-preview">
                    {photos.length > 0 && photos.map((item, index) => (
                        <div className="prev-img" key={index} data-imgindex={index}>
                            <span onClick={handleDelete}>&times;</span>
                            <img src={item.src} alt={item.name}/>
                        </div>
                    ))}
                </div>
            </div>
            <button type="submit" className="btn-submit">Submit</button>
        </form>
    </div>


    </div>
  );
}

export default App;
