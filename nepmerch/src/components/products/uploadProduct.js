import React, { useState } from "react";
import FileUpload from "../utilities/FileUpload";
import axios from "axios";

import { useSelector } from "react-redux";
const Continents = [
	{ key: 1, value: "Africa" },
	{ key: 2, value: "Europe" },
	{ key: 3, value: "Asia" },
	{ key: 4, value: "North America" },
	{ key: 5, value: "South America" },
	{ key: 6, value: "Australia" },
	{ key: 7, value: "Antarctica" },
];

function UploadProduct(props) {
	const [TitleValue, setTitleValue] = useState("");
	const [DescriptionValue, setDescriptionValue] = useState("");
	const [PriceValue, setPriceValue] = useState(0);
	const [ContinentValue, setContinentValue] = useState("");
	const [Images, setImages] = useState([]);

//	const storeName  = useSelector((state) => state.auth.storeName);

	const storeName  = props.match.params.storeName;
	console.log('this is from uploadProduct', storeName);

	const onTitleChange = (event) => {
		setTitleValue(event.currentTarget.value);
	};

	const onDescriptionChange = (event) => {
		setDescriptionValue(event.currentTarget.value);
	};
	const onPriceChange = (event) => {
		setPriceValue(event.currentTarget.value);
	};
	const onContinentsSelectChange = (event) => {
		setContinentValue(event.currentTarget.value);
	};
	const updateImages = (newImages) => {
		setImages(newImages);
		// console.log(newImages)
	};
	const onSubmit = (event) => {
		event.preventDefault();
		const variables = {
			writer: "InsertObjectID",
			title: TitleValue,
			description: DescriptionValue,
			price: PriceValue,
			images: Images,
			continents: ContinentValue,
		};
		axios
			.post(`http://localhost:5000/product/uploadProduct?storeName=${storeName}`, variables)
			.then((response) => {
				if (response.data.success) {
					console.log("done");
					alert("Product uploaded successfully");
					window.location = "/";
				} else {
					console.log("not done");
					alert("Failed to Upload ");
				}
			})
			.catch((err) => {
				console.log(err);
			});

		//JOI validations remaining
	};

	return (
		<div className="container">
			<div className="container">
				<h3>uploadProduct</h3>
			</div>

			<form>
				<br />
				<br />
				<FileUpload refreshfunction={updateImages} />
				<br />
				<br />
				<label>Title</label>
				<input onChange={onTitleChange} value={TitleValue} />
				<br />
				<br />
				<label>Description</label>
				<textarea onChange={onDescriptionChange} value={DescriptionValue} />
				<br />
				<br />
				<label>Price($)</label>
				<input onChange={onPriceChange} value={PriceValue} type="number" />
				<br />
				<br />
				<select onChange={onContinentsSelectChange} value={ContinentValue}>
					{Continents.map((item) => (
						<option key={item.key} value={item.key}>
							{item.value}{" "}
						</option>
					))}
				</select>
				<br />
				<br />

				<button onClick={onSubmit}>Submit</button>
			</form>
		</div>
	);
}

export default UploadProduct;
