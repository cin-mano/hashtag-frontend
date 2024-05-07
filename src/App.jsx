import { useState } from 'react';
import './App.css'

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [resp, setResp] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setResp("");
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    //add api here
    //change for img and vid file

    fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data?.result)
          console.log(data, "--------------");
        setResp(data?.result)
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  }

  return (
    <>
      <div className='bg-orange-300 h-full'>
        <h1 className='bg-slate-700 text-red-500 min-h-10 text-center justify-center align-middle text-4xl'>AUTO HASHTAGS</h1>
        <p className='mt-5'><strong>Upload your image/video file</strong></p>
        <p><strong>Click start button to find all hashtag</strong></p>
        <div className='flex'>
          <div className='flex-1 border-2 ml-10 m-4 min-h-96 content-center'>
            <label title="Click to upload" for="button2" className="cursor-pointer flex items-center px-6 py-4 before:border-gray-400/60 hover:before:border-gray-300 group before:bg-gray-100 before:inset-0 before:rounded-3xl before:border before:border-dashed before:transition-transform before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 justify-center">
              <div className="relative content-center ">
                <img className="w-12" src="https://www.svgrepo.com/show/485545/upload-cicle.svg" alt="file upload icon" width="512" height="512" />
              </div>
              <div className="relative content-center">
                <span className="block text-base font-semibold relative text-blue-900 group-hover:text-blue-500">
                  Upload a file
                </span>
                <span className="mt-0.5 block text-sm text-gray-500">Max 20 MB</span>
                <span className="mt-0.5 block text-sm text-gray-500">Only Image/video file</span>
              </div>
            </label>
            {selectedFile && <span className="mt-2 ml-8 bg-slate-500 p-3">{selectedFile?.name}</span>}
            <input type="file" name="button2" id="button2" className='hidden' onChange={handleFileChange} key={selectedFile ? selectedFile.name : ''} accept="image/*,video/*" maxFileSize={20971520} />
            {selectedFile && <button className='mt-2 ml-3 text-white bg-zinc-700 hover:bg-white hover:border-black hover:text-black font-bold py-2 px-4 border border-zinc-700 rounded-lg h-12 cursor-pointer' onClick={() => { setSelectedFile(null); setResp("") }}>Clear</button>}
          </div>
          <div className="flex-1 border-2 mr-10 m-4 min-h-96">
            <p className='text-5xl'>#tags</p>
            {resp.length > 0 && <div className="border-2 mr-5 m-4 p-4 min-h-60 bg-white flex justify-start">
              <span className='text-2xl'>{resp}</span>
            </div>}
          </div>
        </div>
        <button className='w-1/3 mt-10 mb-8 text-white bg-zinc-700 hover:bg-white hover:border-black hover:text-black font-bold py-2 px-4 border border-zinc-700 rounded-lg h-12 cursor-pointer' onClick={() => handleSubmit()}>Start</button>
      </div>
    </>
  )
}

export default App
