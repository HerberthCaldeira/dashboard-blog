export default function Table({ data }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data?.data.map((i) => {
              return (
                <tr key={i.id}>
                  <td>{i.id} </td>
                  <td>{i.name} </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
