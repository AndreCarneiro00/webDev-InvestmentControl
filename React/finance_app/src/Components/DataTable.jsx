import InputGroup from "react-bootstrap/InputGroup"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export const FilterComponent = ({onFilter, filterText}) => (
	<>
	<InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
		  type="text"
          placeholder="Search Here"
          value={filterText}
          onChange={onFilter}
        />
      </InputGroup>
	</>
)

export function convertToCSV(array) {
	let result;

	const columnDelimeter = ",";
	const lineDelimeter = "\n";
	const keys = Object.keys(array[0]);

	result = "";
	result += keys.join(columnDelimeter)
	result += lineDelimeter

	array.forEach(item => {
		let ctr = 0
		keys.forEach(key => {
			if (ctr > 0) result += columnDelimeter
			result += item[key]
			ctr++
		})
		result += lineDelimeter;
	})
	return result
}

export function dowloadCSV(array) {
	const link = document.createElement("a");
	let csv = convertToCSV(array);
	if (csv == null) return;

	const filename = "NotesExported.csv";
	if (csv.match(/^data:text\/cvv/i)){
		csv = `data:text/csv;charset=utf-8,${csv}`;
	}
	link.setAttribute("href", encodeURI(csv));
	link.setAttribute("download", filename);
	link.click()
}