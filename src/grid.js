import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Table, Navbar,Alert } from 'react-bootstrap';

const GridComponent = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/files/data/', { timeout: 5000 });
          setData(response.data);
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <Navbar style={{ backgroundColor: "#CA1806", width: "100%" }}>
          <Navbar.Brand href="#" style={{ color: "white", paddingLeft: "10px", fontWeight: "bold" }}>
          <h2>ToolBox Test</h2>
          </Navbar.Brand>
        </Navbar> 
        <Container>
          <h2>Archivos encontrados</h2>
          {error && (
            <Alert variant="danger">
              El servicio no respondió después de 5 segundos. Por favor, inténtalo de nuevo más tarde.
            </Alert>
          )}
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Archivo</th>
                <th>Texto</th>
                <th>Número</th>
                <th>Hex</th>
              </tr>
            </thead>
            <tbody>
              {data.map(item => (
                <React.Fragment key={item.file}>
                  {item.lines.map((line, index) => (
                    <tr key={`${item.file}_${index}`}>
                      <td> {item.file}</td>
                      <td>{line.text}</td>
                      <td>{line.number}</td>
                      <td>{line.hex}</td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  };
  

  
  

export default GridComponent;