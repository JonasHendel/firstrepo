// Libraries and frameworks
import react, { useState, useMemo } from "react";
import {
	Container,
	Button,
	Form,
	FormGroup,
	Input,
	Label,
	Alert,
} from "reactstrap";

// Files from project
import api from "../../services/api";
import CameraIcon from "../../assets/camera.png";
import "./events.css";

export default function EventsPage() {
	const user_id = localStorage.getItem("user");
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState("");
	const [thumbnail, setThumbnail] = useState(null);
	const [sport, setSport] = useState("");
	const [date, setDate] = useState("");
	const [errorMessage, setErrorMessage] = useState(false);

	const preview = useMemo(() => {
		return thumbnail ? URL.createObjectURL(thumbnail) : null;
	}, [thumbnail]);

	const submitHandler = async (evt) => {
		evt.preventDefault();

		const user_id = localStorage.getItem("user");

		const eventData = new FormData();

		eventData.append("thumbnail", thumbnail);
		eventData.append("sport", sport);
		eventData.append("title", title);
		eventData.append("price", price);
		eventData.append("description", description);
		eventData.append("date", date);

		try {
			if (
				title !== "" &&
				description !== "" &&
				price !== "" &&
				sport !== "" &&
				date !== "" &&
				thumbnail !== null
			) {
				console.log("Event has been sent");
				await api.post("/event", eventData, { headers: { user_id } });
				console.log(eventData);
				console.log("Event has been saved");
			} else {
				setErrorMessage(true);
				setTimeout(() => {
					setErrorMessage(false);
				}, 4000);

				console.log("Missing required data");
			}
		} catch (error) {
			Promise.reject(error);
			console.log(error);
		}

		return "";
	};

	return (
		<Container>
			<h1>Create Event</h1>
			<Form onSubmit={submitHandler}>
				<FormGroup>
					<Label>Upload image</Label>
					<Label
						id="thumbnail"
						style={{ backgroundImage: `url(${preview})` }}
						className={thumbnail ? "has-thumbnail" : ""}
					>
						<Input
							type="file"
							onChange={(evt) =>
								setThumbnail(evt.target.files[0])
							}
						/>
						<img
							src={CameraIcon}
							alt="upload icon image"
							style={{ maxWidth: "50px" }}
						/>
					</Label>
				</FormGroup>
				<FormGroup>
					<Label>Sport</Label>
					<Input
						id="sport"
						type="text"
						value={sport}
						placeholder="Sport name"
						onChange={(evt) => setSport(evt.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Title: </Label>
					<Input
						id="title"
						type="text"
						value={title}
						placeholder="Event title"
						onChange={(evt) => setTitle(evt.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Event description: </Label>
					<Input
						id="description"
						type="text"
						value={description}
						placeholder="Event description"
						onChange={(evt) => setDescription(evt.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Event price: </Label>
					<Input
						id="price"
						type="text"
						value={price}
						placeholder="Event price 0.00$"
						onChange={(evt) => setPrice(evt.target.value)}
					/>
				</FormGroup>
				<FormGroup>
					<Label>Event date: </Label>
					<Input
						id="date"
						type="date"
						value={date}
						placeholder="Event price 0.00$"
						onChange={(evt) => setDate(evt.target.value)}
					/>
				</FormGroup>
				<Button type="submit">Create Event</Button>
			</Form>
			{errorMessage ? (
				<Alert className="event-validation" color="danger">
					Missing required information.
				</Alert>
			) : (
				""
			)}
		</Container>
	);
}
