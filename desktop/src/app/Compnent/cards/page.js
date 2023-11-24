import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { VscEdit } from 'react-icons/vsc';
import { TfiReload } from 'react-icons/tfi';
import Loader from '../loader/page';


function Cards() {
  const [data, setData] = useState([]);
  const [loader, setloader] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setformData] = useState({
    des: "",
    img: Buffer,
    _id: ""
  })

  const [editFormData, seteditFormData] = useState({
    des: "",
    img: Buffer,
    _id: ""
  })

  const Edit = async (e) => {
    e.preventDefault();
    console.log(formData);

    const formDataForServer = new FormData();
    // Append other form data
    Object.keys(formData).forEach((key) => {
      formDataForServer.append(key, formData[key]);
    });

    const response = await axios({
      method: 'post',
      url: `http://localhost:8080//updatecard/:${id}`,
      data: formDataForServer,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  const getdata = (e) => {
    const { name, value } = e.target;

    if (name === "img" && e.target.files.length > 0) {
      const file = e.target.files[0];
      setformData({ ...formData, [name]: file });
    } else {
      setformData({ ...formData, [name]: value });
    }
  };
  
  const Modaldata = (data) => {
    setModalOpen(true)
    console.log(data);
    seteditFormData(data)
  }

  const deleteData = async (id) => {
    // Delete logic
    try {
      // Perform your delete logic here
      await axios.delete(`http://localhost:8080/deletecard/${id}`);

      // Update the state by removing the deleted item
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Delete Data error:", error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/getimgdb");
      const getdata = await response.data;

      setloader(false);
      const processedData = getdata.map((item) => {
        const imageSrc = item?.img
          ? `data:image/jpeg;base64,${Buffer.from(
            item.img.data,
            'binary'
          ).toString('base64')}`
          : null;

        return {
          ...item,
          img: imageSrc,
        };
      });

      setData(processedData);

    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>{loader ? (<Loader />) :
      (<div class='flex flex-col relative'>

        <div class='absolute top-0 right-0 text-lg p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700'>
          <button onClick={() => { fetchData(); console.log('working') }} >
            <TfiReload />
          </button>
        </div>

        <div class='flex flex-wrap m-auto md:ml-80 dark:bg-slate-800'>
          {data.map((data) => (
            <div className='shadow md:shadow-ml mx-3 p-5 h-50 w-80 m-2' key={data._id}>
              <img className="rounded-lg h-40 w-80" src={data?.img} alt="image description" />
              <div className='flex justify-between '>
                <p>{data?.des}</p>
                <div className='order-last'>
                  <ul className="py-2 flex text-sm text-gray-700 dark:text-gray-200">
                    <li>
                      <button className=' hover:bg-amber-200 rounded text-xl hover:text-amber-800 block p-2  w-full' onClick={()=> Modaldata(data)}>
                        <VscEdit />
                      </button>
                    </li>
                    <li>
                      <button className='hover:bg-red-300 rounded text-xl hover:text-red-800 block p-2   w-full' onClick={() => deleteData(data._id)}>
                        <MdOutlineDeleteForever />
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {modalOpen ? (


          <div class="fixed flex justify-center items-center z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
            <div class="relative w-full max-w-md max-h-full">
              {/* <!-- Modal content --> */}
              <div class="relative bg-stone-200 rounded-lg shadow dark:bg-gray-700">
                <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={() => setModalOpen(false)} >
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span class="sr-only">Close modal</span>
                </button>
                <div class="px-6 py-6 lg:px-8">
                  <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit</h3>
                  <form class="space-y-6" action="#">
                    <div>
                      <label>id: </label>
                      <label>{editFormData._id}</label>

                    </div>
                    <div>
                      <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">
                        Upload Image :
                      </label>
                      <input
                        class="block w-full text-sm text-slate-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                          file:bg-primary-600 file:text-white
                          hover:file:bg-primary-700"
                        id="file_input" type="file"
                        name='img'
                        // value={editFormData.img}
                        // onChange={}
                      />
                    </div>
                    <div>
                      <label for="text" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        Description :
                      </label>
                      <textarea name="des" id="descripition" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="descripition" required=""
                        value={editFormData.des} 
                        // onChange={}
                      ></textarea>
                    </div>
                    <button type="submit" class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={Edit}
                    >
                      Update
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
          :

          (null)}



      </div>)}

    </  >
  );
}

export default Cards;
