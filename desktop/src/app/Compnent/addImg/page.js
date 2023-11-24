'use client'
import React, { useState } from 'react';
import axios from 'axios';
import Cards from '../cards/page';



function AddImg() {

  const [formData, setformData] = useState({
    des: "",
    img: Buffer,

  })


  const getdata = (e) => {
    const { name, value } = e.target;

    if (name === "img" && e.target.files.length > 0) {
      const file = e.target.files[0];
      setformData({ ...formData, [name]: file });
    } else {
      setformData({ ...formData, [name]: value });
    }
  };




  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

      const formDataForServer = new FormData();
      // Append other form data
      Object.keys(formData).forEach((key) => {
        formDataForServer.append(key, formData[key]);
      });

      const response = await axios({
        method: 'post',
        url: 'http://localhost:8080/addimg',
        data: formDataForServer,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setformData({img:Buffer,des:""});

      if (response.status === 200) {
        // router.push('/signin')
        console.log("card is added" + response);
        
      }
      else {
        alert("card is not create");
      }
    
  };

  return (
    <>
    <div>
      <div class="w-full md:ml-80 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">

          <form class="space-y-4 md:space-y-6" action="#">


            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Upload Image</label>
              <input
                class="block w-full text-sm text-slate-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primary-600 file:text-white
                hover:file:bg-primary-700"
                id="file_input" type="file"
                name='img'
                onChange={getdata}
              />
            </div>

            <div>
              <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
              <textarea name="des" id="descripition" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="descripition" required=""
                value={formData.des} onChange={getdata}
              ></textarea>
            </div>


            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              onClick={onSubmit}>
              Upload
            </button>

          </form>
        </div>


      </div>

    </div>
    
    <div>
      <Cards />
    </div>
    </>
  )
}

export default AddImg
