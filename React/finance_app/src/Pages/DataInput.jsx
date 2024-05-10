import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import DataTable from "react-data-table-component";
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';
import "../style/DynamicInputs.css";
import api from "../api";
import React, { useState, useEffect } from "react";

const DataInput = () => {
  const [notes, setNotes] = useState([])

  function valuesToString(data) {
    const newData = []
    data.forEach( (d) => {
      const newVal = {}
      Object.keys(d).forEach(k => {
        newVal[k] = String(d[k])
        });
      newData.push(newVal);
      });
      return newData;
    }

  const fetchNotes = async () => {
    const response = await api.get("get_all_notes");
    let data = response.data
    data = valuesToString(data)
    setNotes(data)
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    "note": "25812",
    "broker": "Inter",
    "opDate": date.toISOString().slice(0, 10),
    "liqDate": date.toISOString().slice(0, 10),
    "irrf": 0,
    "liqFee": 0,
    "registerFee": 0,
    "derivativeFee": 0,
    "anaFee": 0,
    "emolumentos": 0.3,
    "operationalFee": 0,
    "executionFee": 0,
    "custodyFee": 0,
    "taxes": 0,
    "others": 0
  });

  const handleInputChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
    };

    const isValidFormData = Object.values(formData).every(value => value !== "")

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const apiData = {"noteInfos": formData, "noteOperations": inputFields};
    await api.post("/create_note", apiData);
    setFormData({
      "note": "2516",
      "broker": "Inter",
      "opDate": date.toISOString().slice(0, 10),
      "liqDate": date.toISOString().slice(0, 10),
      "irrf": 0,
      "liqFee": 0,
      "registerFee": 0,
      "derivativeFee": 0,
      "anaFee": 0,
      "emolumentos": 0.3,
      "operationalFee": 0,
      "executionFee": 0,
      "custodyFee": 0,
      "taxes": 0,
      "others": 0
    });
    setInputFields([{ ticker: "", opType: "C", quantity: "", price: "" }]);
    fetchNotes();
  }
  const [inputFields, setInputFields] = useState([{ ticker: "", opType: "C", quantity: "", price: "" }]);

  // Function to add a new input field
  const handleAddFields = () => {
      setInputFields([...inputFields, { ticker: "", opType: "C", quantity: "", price: "" }]);
  };

  // Function to remove an input field by index
  const handleRemoveFields = (index) => {
      const newInputFields = [...inputFields];
      newInputFields.splice(index, 1);
      setInputFields(newInputFields);
  };

  // Function to update the value of an input field
  const handleValueChange = (event, index) => {
      const inputField = [...inputFields];
      const {name, value} = event.target;
      inputField[index][name] = value;
      setInputFields(inputField);
  };

  let isValidInputFields = true
  inputFields.forEach((inputField) => {
    if (!(inputField.ticker && inputField.opType && inputField.quantity && inputField.price && inputField.price !== "0" && inputField.quantity !== "0")) {
      isValidInputFields = false
    }
  });

  const columns = [
    {name: "ID", selector: (row) => row.id, cellExport: (row) => row.id, sortable: true},
    {name: "Note", selector: (row) => row.note, cellExport: (row) => row.note, sortable: true},
    {name: "Broker", selector: (row) => row.broker, cellExport: (row) => row.broker, sortable: true},
    {name: "OpDate", selector: (row) => row.opDate, cellExport: (row) => row.opDate, sortable: true},
    {name: "LiqDate", selector: (row) => row.liqDate, cellExport: (row) => row.liqDate, sortable: true},
    {name: "OpType", selector: (row) => row.opType, cellExport: (row) => row.opType, sortable: true},
    {name: "Ticker", selector: (row) => row.ticker, cellExport: (row) => row.ticker, sortable: true},
    {name: "Quantity", selector: (row) => row.quantity, cellExport: (row) => row.quantity, sortable: true},
    {name: "Price", selector: (row) => row.price, cellExport: (row) => row.price, sortable: true},
    {name: "IRR", selector: (row) => row.irrf, cellExport: (row) => row.irrf, sortable: true},
    {name: "LiqFee", selector: (row) => row.liqFee, cellExport: (row) => row.liqFee, sortable: true},
    {name: "RegisterFee", selector: (row) => row.registerFee, cellExport: (row) => row.registerFee, sortable: true},
    {name: "DerivativeFee", selector: (row) => row.derivativeFee, cellExport: (row) => row.derivativeFee, sortable: true},
    {name: "ANAFee", selector: (row) => row.anaFee, cellExport: (row) => row.anaFee, sortable: true},
    {name: "Emolumentos", selector: (row) => row.emolumentos, cellExport: (row) => row.emolumentos, sortable: true},
    {name: "OperationalFee", selector: (row) => row.operationalFee, cellExport: (row) => row.operationalFee, sortable: true},
    {name: "ExecutionFee", selector: (row) => row.executionFee, cellExport: (row) => row.executionFee, sortable: true},
    {name: "CustodyFee", selector: (row) => row.custodyFee, cellExport: (row) => row.custodyFee, sortable: true},
    {name: "Taxes", selector: (row) => row.taxes, cellExport: (row) => row.taxes, sortable: true},
    {name: "Others", selector: (row) => row.others, cellExport: (row) => row.others, sortable: true}
];

const [selectedRows, setSelectedRows] = useState([]);

const handleDeleteRows = async () => {
  const selectedIds = selectedRows.map(row => row.id);

  const response = await api.delete("delete_note_row_by_ids", {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ids: selectedIds }),
  });
  console.log(response.data)
  setSelectedRows([]);
};

const handleRowSelected = rows => {
  setSelectedRows(rows.selectedRows);
};

	return (
        <div className="container mt-3">
		<Form onSubmit={handleFormSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridNote">
          <Form.Label>Nota</Form.Label>
          <Form.Control name="note" onChange={handleInputChange} value={formData.note}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridBroker">
          <Form.Label>Corretora</Form.Label>
          <Form.Control name="broker" onChange={handleInputChange} value={formData.broker}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridOpDate">
          <Form.Label>Data da Operação</Form.Label>
          <Form.Control type="date" name="opDate" onChange={handleInputChange} value={formData.opDate}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLiqDate">
          <Form.Label>Data de Liquidação</Form.Label>
          <Form.Control type="date" name="liqDate" onChange={handleInputChange} value={formData.liqDate}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridIrrf">
          <Form.Label>I.R.R.F</Form.Label>
          <Form.Control type="number" min="0" step="0.01" name="irrf" onChange={handleInputChange} value={formData.irrf}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridLiqFee">
          <Form.Label>Taxa de Liquidação</Form.Label>
          <Form.Control type="number" min="0" step="0.01" name="liqFee" onChange={handleInputChange} value={formData.liqFee}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridRegFee">
          <Form.Label>Taxa de Registro</Form.Label>
          <Form.Control type="number" min="0" step="0.01" name="registerFee" onChange={handleInputChange} value={formData.registerFee}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridDerivativeFee">
          <Form.Label>Taxa de Termo/Opções</Form.Label>
          <Form.Control type="number" min="0" step="0.01" name="derivativeFee" onChange={handleInputChange} value={formData.derivativeFee}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridAnaFee">
          <Form.Label>Taxa A.N.A</Form.Label>
          <Form.Control type="number" min="0" step="0.01" name="anaFee" onChange={handleInputChange} value={formData.anaFee}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridLiqEmolumentos">
          <Form.Label>Emolumentos</Form.Label>
          <Form.Control type="number" min="0" step="0.01" name="emolumentos" onChange={handleInputChange} value={formData.emolumentos}/>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridOperationalFee">
          <Form.Label>Taxa Operacional</Form.Label>
          <Form.Control type="number" min="0" step="0.01" name="operationalFee" onChange={handleInputChange} value={formData.operationalFee}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridexEcutionFee">
          <Form.Label>Taxa de execução</Form.Label>
          <Form.Control type="number" min="0" step="0.01" name="executionFee" onChange={handleInputChange} value={formData.executionFee}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCustodyFee">
          <Form.Label>Taxa de Custódia</Form.Label>
          <Form.Control type="number" min="0" step="0.01" name="custodyFee" onChange={handleInputChange} value={formData.custodyFee}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridTaxes">
          <Form.Label>Impostos</Form.Label>
          <Form.Control type="number" min="0" step="0.01" name="taxes" onChange={handleInputChange} value={formData.taxes}/>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridOthers">
          <Form.Label>Outras Taxas</Form.Label>
          <Form.Control type="number" min="0" step="0.01" name="others" onChange={handleInputChange} value={formData.others}/>
        </Form.Group>
      </Row>

      {inputFields.map((inputField, index) => (
        <Row className="mb-3" key={index}>
            <Form.Group as={Col} controlId="ticker">
                <Form.Label>Ticker</Form.Label>
                <Form.Control name="ticker" value={inputField.ticker} onChange={(e) => handleValueChange(e, index)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="opType">
                <Form.Label>Tipo de Operação</Form.Label>
                <Form.Select name="opType" defaultValue={inputField.opType} onChange={(e) => handleValueChange(e, index)}>
                    <option>C</option>
                    <option>V</option>
                </Form.Select>
            </Form.Group>

            <Form.Group as={Col} controlId="quantity">
                <Form.Label>Quantidade</Form.Label>
                <Form.Control type="number" min="0" name="quantity" value={inputField.quantity} onChange={(e) => handleValueChange(e, index)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="price">
                <Form.Label>Preço</Form.Label>
                <Form.Control type="number" min="0" step="0.01" name="price" value={inputField.price} onChange={(e) => handleValueChange(e, index)}/>
            </Form.Group>

            <Form.Group as={Col} controlId="price">
              <button
              className="delete-btn" type="button"
              onClick={() => handleRemoveFields(index)}
              >
                <span>delete</span>
              </button>
            </Form.Group>
        </Row>))}
        <button type="button" className="mb-3 add-btn" onClick={handleAddFields}>
          <span className="material-symbols-outlined add-icon">add</span>
        </button>
      
      <Button className="mb-3" type="submit" disabled={!(isValidFormData && isValidInputFields)}>
        Submit
      </Button>
    </Form>
    <DataTableExtensions columns={columns} data={notes} filterDigit={1} exportHeaders={true}>
      <DataTable
        pagination
        selectableRows
        selectableRowsHighlight
        persistTableHead
        highlightOnHover
        onSelectedRowsChange={handleRowSelected}
      />
    </DataTableExtensions>
    </div>
	);
};

export default DataInput;