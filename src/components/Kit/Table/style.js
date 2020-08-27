import React from "react";
import styled from "styled-components";

const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  /* border-collapse: separate; */
  /* border-spacing: 5px 10px; */

  caption-side: bottom;
  /* empty-cell: show | hide;  */
  /* empty-cell is a property of table or the cells themselves */

  /* vertical-align: baseline | sub | super | text-top | 
                text-bottom | middle | top | bottom | 
                <percentage> | <length> */

  /* tbody {
    vertical-align: top;
  }              */
  /* td,
  th {
    border: none;
  } */
  td,
  th {
    border: 1px solid;
  }

  td {
    padding: 5px 10px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;
export default ({ data, userName }) => (
  <TableMarkup userName={userName} data={data} />
);
const TableMarkup = ({ titles, data, userName }) => (
  <StyledTable>
    <colgroup>
      <col />
      <col />
      <col />
    </colgroup>
    <thead>
      <tr>
        <th>{userName}</th>
        <th>artificial intelligence</th>
        {/* {titles.map((title, index) => (
          <th key={index}>{title}</th>
        ))} */}
      </tr>
    </thead>
    <tbody>
      {data ? (
        Object.keys(data).map((item, index) =>
          index < 2 ? (
            <tr key={index}>
              <td key={index}>{data[item]}</td>
              <td>0</td>
            </tr>
          ) : (
            <tr key={index}>
              <td key={index} colSpan="2">
                Game # {new Date().toLocaleString()}
              </td>
            </tr>
          )
        )
      ) : (
        <>
          <tr>
            <td colSpan="2">Game # {new Date().toLocaleDateString()}</td>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </>
      )}
      {/* {data.map((item, index) => (
        <tr key={index}>
          {titles.map((title, index) => (
            <td key={index}>{item[title]}</td>
          ))}
        </tr>
      ))} */}
    </tbody>
    {/* <tfoot>
      <tr>
        {titles.map((title, index) => (
          <th key={index}>{title}</th>
        ))}
      </tr>
    </tfoot> */}
  </StyledTable>
);
