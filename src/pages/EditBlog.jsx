import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditBlog() {
  const {id} = useParams()
  const navigate  = useNavigate()
  const [data,setData] = useState({
    title: "",
    subtitle: "",
    description: "",
    image: ""

  })

  const handleChange = (e)=>{
    const {name,value} = e.target
    setData({
      ...data,
      [name] : name === "image" ? e.target.files[0] : value
    })
  }

  const editblog = async (e)=>{
    e.preventDefault()
    const response = await axios.patch("https://pranjal-blog-project.onrender.com/blog/" + id, data, {
      headers : {
        "Content-Type" : "multipart/form-data"
      }
    })

    if(response.status === 200) {
      navigate("/blog/" + id)
    }
    else {
      alert("Something went wrong!!!")
    }
  }

  const fetchSingleBlog = async () => {
    const response = await axios.get("https://pranjal-blog-project.onrender.com/blog/" + id);
    if(response.status === 200) {
      setData({
        title : response.data.data.title,
        description : response.data.data.description,
        subtitle: response.data.data.subtitle,
      })
    } else {
      alert("Something went wrong!!")
    }
  };

  useEffect(() => {
    fetchSingleBlog();
  }, []);

  console.log(data)

  return (
    <>
      <Navbar />
      <div className="mx-14 mt-10 border-2 border-blue-400 rounded-lg">
        <div className="mt-10 text-center font-bold">Wanna edit blog ? </div>
        <div className="mt-3 text-center text-4xl font-bold">Edit Blog</div>
        <form onSubmit={editblog}> 
          <div className="p-8">
            <div className="flex gap-4">
              <input
                type="text"
                name="title"
                className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Title *"
                onChange={handleChange}
                value={data.title}
              />

              <input
                type="text"
                name="subtitle"
                className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                placeholder="Subtitle *"
                onChange={handleChange}
                value={data.subtitle}
              />
            </div>
            <div className="my-6 flex gap-4">
              <input
                type="file"
                name="image"
                className="mt-1 block w-1/2 rounded-md border border-slate-300 bg-white px-3 py-4 placeholder-slate-400 shadow-sm placeholder:font-semibold placeholder:text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <textarea
                name="description"
                id="text"
                cols="30"
                rows="10"
                className="mb-10 h-40 w-full resize-none rounded-md border border-slate-300 p-5 font-semibold text-black-300"
                onChange={handleChange}
                value={data.description}
              >
                Description
              </textarea>
            </div>
            <div className="text-center">
              <button className="cursor-pointer rounded-lg bg-blue-700 px-8 py-5 text-sm font-semibold text-white">
                Edit Blog
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditBlog;
