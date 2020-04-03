import Link from "next/link";
import Router from "next/router";
import axios from "axios";
import * as Icon from "react-bootstrap-icons";

import Layout from "../components/Layout";
function Todos({ todos }) {
  function deleteTodo(todoId) {
    axios
      .delete(`/api/todo?id=${todoId}`)
      .then((res) => Router.push("/todos"))
      .catch((err) => console.log(err));
  }

  return (
    <Layout>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Folder</th>
            <th scope="col">Todo</th>
            <th scope="col">Priority</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {todos.map((item, index) => (
            <tr key={index}>
              <td>
                {React.createElement(Icon[item.folder.icon], { size: 21 })}
                &nbsp;
                {item.folder.name}
              </td>
              <td>{item.title}</td>
              <td>{item.priority}</td>
              <td>{item.date ? new Date(item.date).toLocaleDateString() : ''}</td>
              <td style={{ width: 68 }}>
                <Link href={"/todo/[id]"} as={`/todo/${item._id}`}>
                  <a>
                    <Icon.Pen color="black" size={21} />
                  </a>
                </Link>
                <Icon.Trash size={21} onClick={() => deleteTodo(item._id)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}

Todos.getInitialProps = async (ctx) => {
  const res = await axios.get("/api/todo");
  return { todos: res.data };
};

export default Todos;
