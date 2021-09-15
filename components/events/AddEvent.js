import React, { useEffect, useState } from "react";
import styles from "@/styles/AddEvent.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { toast } from "react-toastify";
import { API_URL } from "@/config/index";
import dayjs from "dayjs";
import Image from "next/image";
import {} from "react-icons";
import { FaImage } from "react-icons/fa";
import Modal from "../common/Modal";
import { scrollTop } from "utils/scroll";
import ImageUpload from "../common/ImageUpload";

const AddEvent = ({ event = null }) => {
  const [values, setValues] = useState({
    name: "",
    time: "",
    venue: "",
    address: "",
    performers: "",
    description: "",
    date: new Date().toLocaleDateString("en-US"),
  });

  const [image, setImage] = useState("");
  const [imagePreview, setImagePreview] = useState("");

  const [showModal, setShowModal] = useState(false);

  const onClose = () => {
    setShowModal(false);
  };

  const onModalClick = () => {
    scrollTop();
    setShowModal(true);
  };

  useEffect(() => {
    if (event) {
      setValues({
        name: event.name,
        time: event.time,
        venue: event.venue,
        address: event.address,
        performers: event.performers,
        description: event.description,
        date: event.date,
      });
      if (event.image) {
        setImagePreview(event.image.formats.thumbnail.url);
      }
    }
  }, [event]);

  const router = useRouter();

  const handleInputChange = (e) => {
    setValues((val) => ({ ...val, [e.target.name]: e.target.value }));
  };

  const handleSubmitAddEvent = async (e) => {
    e.preventDefault();
    // simple validate
    const hasEmptyFields = Object.values(values).some((el) => el === "");
    if (hasEmptyFields) {
      toast.error("Some field is empty, Please fill full field");
      return;
    }

    try {
      let data;

      if (!event) {
        const res = await fetch(`${API_URL}/events`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        data = await res.json();
      } else {
        const res = await fetch(`${API_URL}/events/${event.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        data = await res.json();
      }

      console.log(data);

      router.push(`/events/${data.slug}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const imageUploaded = async () => {
    const res = await fetch(`${API_URL}/events/${event.id}`);
    const data = await res.json();
    setImagePreview(data.image.formats.thumbnail.url);
    setShowModal(false);
  };

  return (
    <div className="add-event">
      <Link href="/events">
        <a>Go back Events</a>
      </Link>
      <h1>{event ? "Edit Event" : "Add new Event"}</h1>
      <form onSubmit={handleSubmitAddEvent} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              id="performers"
              name="performers"
              value={values.performers}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              id="venue"
              name="venue"
              value={values.venue}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={dayjs(values.date).format("YYYY-MM-DD")}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              id="time"
              name="time"
              value={values.time}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <textarea
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <input
          type="submit"
          value={event ? "Update Event" : "Add Event"}
          className="btn btn-secondary"
        />
      </form>
      {event && (
        <div>
          <h2>Image preview</h2>
          {imagePreview ? (
            <Image
              src={imagePreview}
              alt={event.name}
              width={170}
              height={100}
            />
          ) : (
            <div>
              <p>No image uploaded</p>
            </div>
          )}
          <div>
            <button className="btn" onClick={onModalClick}>
              <FaImage /> Set Image
            </button>
          </div>
        </div>
      )}

      {showModal && (
        <Modal show={showModal} onClose={onClose} title="Upload Image">
          <ImageUpload evtId={event.id} imageUploaded={imageUploaded} />
        </Modal>
      )}
    </div>
  );
};

export default AddEvent;
