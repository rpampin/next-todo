import axios from "axios";
import Layout from "../../components/Layout";
import TodoForm from "../../components/TodoForm";

const Edit = props => (
  <Layout>
    <h2>Edit Todo</h2>
    <TodoForm todo={props.todo} />
  </Layout>
);

Edit.getInitialProps = async function(context) {
  const { id } = context.query;
  let res = await axios.get(`/api/todo?id=${id}`);
  return { todo: res.data };
};

export default Edit;
