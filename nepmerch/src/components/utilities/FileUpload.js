import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { USER_SERVER } from "../config";
import { Paper, Divider } from "@material-ui/core";
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from "@material-ui/core/styles";
//import { useStyles } from "./Style";
import TextField from "@material-ui/core/TextField";

import Typography from "@material-ui/core/Typography";

const useToolbarStyles = makeStyles((theme) => ({
paper: {
		
		justifyContent: 'center',	
	[theme.breakpoints.up("sm")]: {

		 border: "2px dashed #d1d1d1",
		height : 300,
		padding : 120,
	},
},

	icon : {
		fontSize : 40,

	}
	}));





function FileUpload(props) {
	const [Images, setImages] = useState([]);
	const onDrop = (files) => {
		let formdata = new FormData();
		const config = {
			header: { "content-type": "multipart/form-data" },
		};
		formdata.append("file", files[0]);

		// `${USER_SERVER}/product/getProducts`
		// axios.post('http://localhost:5000/product/uploadImage', formdata, config)
		axios
			.post(`${USER_SERVER}/product/uploadImage`, formdata, config)
			.then((response) => {
				if (response.data.success) {
					//do something
					setImages([...Images, response.data.image]);
					console.log([...Images, response.data.image]);
					props.refreshfunction([...Images, response.data.image]);
				} else {
					alert("Failed to save image");
				}
			});
	};

	const onDelete = (image, index) => {
		const cur = Images.indexOf(image);
		let newImages = [...Images];
		newImages.splice(cur, 1);
		setImages(newImages);
		props.refreshfunction(newImages);
	};

	const classes = useToolbarStyles();

	return (
		<div>
			<Dropzone onDrop={onDrop} multiple={false} maxSize={8000000000}>
				{({ getRootProps, getInputProps }) => (
					<div {...getRootProps()}>
						<input {...getInputProps()}  />
					<Paper className = {classes.paper } square > 

 <Typography align='center'>
					    <CloudUploadIcon
					className = {classes.icon}
					      type='submit'
					      variant='contained'
					
					  /   >

 <Typography > Add media files  here  </Typography>

					  </Typography>


							</Paper>
					</div>
				)}
			</Dropzone>
			<div
				style={{
					display: "flex",
					width: "350px",
					height: "240px",
					overflowX: "scroll",
				}}
			>
				{Images.map((image, index) => (
					<div onClick={() => onDelete(image, index)}>
						<img
							style={{ minWidth: "300px", width: "300px", height: "240px" }}
							src={`${USER_SERVER}/uploads/${image}`}
							alt={`productImg-${index}`}
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default FileUpload;
