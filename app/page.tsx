"use client";
import Image from "next/image";
import { ChangeEvent, FormEvent, useState } from "react";

interface ResultData {
  result: string;
}

export default function Home() {
  const [imgSrc, setImgSrc] = useState<string>("");
  const [result, setResult] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);

  const imageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | null = e.target.files ? e.target.files[0] : null;

    const formData = new FormData();
    if (file) {
      formData.append("img", file);
    }

    fetch("https://brain-tumor-model.onrender.com/submit_image", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => setImgSrc(data.img))
      .catch((error) => {
        throw new Error(error.response);
      });
  };

  const getClassification = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    fetch("https://brain-tumor-model.onrender.com/classify", {
      method: "POST",
      body: JSON.stringify({ img: "." + imgSrc }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setResult(data);
        setLoading(false);
      })
      .catch((error) => {
        throw new Error(error.response);
      });
  };

  const clearImage = () => {
    setImgSrc("");
  };

  const clearImageAll = () => {
    setImgSrc("");
    setResult(null);
  };

  return (
    <main className="flex flex-col max-w-screen h-[95vh] text-center px-4 pt-[10vh] gap-[10vh] md:gap-[1em] relative">
      <span>
        <h1 className="text-2xl font-bold tracking-wider text-darkerBlue mb-4 md:text-4xl">
          Brain Tumor Detection
        </h1>
        <p className="text-darkerBlue md:w-[50%] md:m-auto md:text-xl">
          Welcome to our brain tumor classification platform! Upload brain scan
          images for accurate tumor classification with our advanced machine
          learning model, boasting an impressive 98.4% accuracy rate.
        </p>
      </span>
      <form
        className="bg-lighterBlue py-8 px-4 flex flex-col gap-2 text-white md:w-[50%] md:min-h-[35vh] md:m-auto"
        onSubmit={getClassification}
      >
        <p className="text-lg font-bold uppercase">Upload Brain Scan</p>
        {!imgSrc ? (
          <span className="w-[80%] h-[100px] border-2 border-white m-auto border-dashed p-2 relative">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="w-[100%] h-[100%] z-[1] fill-white"
              >
                <path d="M11 15h2V9h3l-4-5-4 5h3z"></path>
                <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
              </svg>
            </span>
            <input
              type="file"
              name="img"
              aria-label="Upload Brain Scan"
              className="z-[2] opacity-0 w-[100%] h-[100%] absolute top-[30%] left-0"
              onChange={imageUpload}
            />
          </span>
        ) : (
          <span className="relative m-auto w-fit">
            <span
              className="bg-white absolute -right-4 rounded-full flex"
              onClick={clearImage}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 24 24"
                className="fill-red-500"
              >
                <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
              </svg>
            </span>
            <Image
              src={"https://brain-tumor-model.onrender.com/" + imgSrc}
              alt="Brain Scan"
              width={128}
              height={128}
              className="m-auto"
            />
          </span>
        )}
        <button
          type="submit"
          className="bg-white text-darkerBlue px-4 w-fit uppercase tracking-widest font-bold m-auto mt-4"
        >
          Upload
        </button>
      </form>

      {loading && (
        <div className="absolute top-0 w-[100vw] h-[100vh] z-[3] bg-gray-400 left-0 opacity-70"></div>
      )}

      {result && (
        <div className="absolute top-0 w-[100vw] h-[100vh] z-[3] bg-gray-400 left-0 opacity-70"></div>
      )}

      {loading && (
        <div className="absolute top-0 w-[100vw] h-[100vh] z-[4] grid left-0 place-content-center">
          <div className="loader">Loading...</div>
        </div>
      )}

      {result && (
        <div className="absolute top-0 w-[100vw] h-[100vh] z-[3] grid place-content-center left-0">
          <span
            className="bg-white absolute top-5 right-5 rounded-full flex"
            onClick={clearImageAll}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              className="fill-red-600"
            >
              <path d="m16.192 6.344-4.243 4.242-4.242-4.242-1.414 1.414L10.535 12l-4.242 4.242 1.414 1.414 4.242-4.242 4.243 4.242 1.414-1.414L13.364 12l4.242-4.242z"></path>
            </svg>
          </span>
          <div className="bg-darkerBlue rounded-md m-auto w-[93vw] md:w-[70vw] h-[60vh] grid place-content-center gap-4 p-4">
            <p className="text-white uppercase tracking-wider font-extrabold text-lg md:text-xl">
              Classification Complete
            </p>
            <Image
              src={"https://brain-tumor-model.onrender.com/" + imgSrc}
              alt="Brain Scan"
              width={250}
              height={250}
              className="m-auto"
            />
            <p className={`text-white text-lg font-bold md:text-xl`}>
              Result:{" "}
              <span
                className={`${
                  result.result === "This brain scan contains a tumor"
                    ? "text-red-400"
                    : "text-lime-400"
                }`}
              >
                {result.result}.
              </span>
            </p>
            <p className="md:text-lg md:font-bold">
              Note: Results should be confirmed by a qualified
              healthcare professional.
            </p>
          </div>
        </div>
      )}
    </main>
  );
}
