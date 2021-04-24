import React from "react";
import { useSelector } from "react-redux";
function History() {
	const history = useSelector((state) => state.auth.user.history);

	const renderHistory = () =>
		history &&
		history.map((detail) => {
			return (
				<tr>
					{/* {detail.paymentId} */}
					<td style={{ border: "1px solid black" }}>{detail.paymentId}</td>
					<td style={{ border: "1px solid black" }}>{detail.price}</td>
					<td style={{ border: "1px solid black" }}>{detail.quantity}</td>
					<td style={{ border: "1px solid black" }}>{detail.dataOfPurchase}</td>
				</tr>
			);
		});

	return (
		<div>
			<table style={{ marginLeft: "auto", marginRight: "auto" }}>
				<thead style={{ border: "1px solid blackl" }}>
					<tr>
						<th>Payment ID </th>
						<th>Price</th>
						<th> Quantity</th>
						<th>Date of Purchase</th>
					</tr>
				</thead>
				<tbody>{renderHistory()}</tbody>
			</table>
		</div>
	);
}

export default History;
