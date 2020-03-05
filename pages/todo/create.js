import Layout from "../../components/Layout";

export default function Create() {
  return (
    <Layout>
      <form action="/api/todo" method="post" autoComplete="off">
        <div className="form-group">
          <label htmlFor="folder">Folder</label>
          <select className="form-control" id="folder"></select>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input className="form-control" id="title" name="title" />
        </div>
        <div className="form-group">
          <label htmlFor="notes">Notes</label>
          <textarea className="form-control" id="notes" name="notes" />
        </div>
        <div className="form-group">
          <label htmlFor="input-type">Priority</label>
          <div id="input-type">
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priority"
                id="priorityHigh"
                value="High"
              />
              <label className="form-check-label" htmlFor="priorityHigh">
                High
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priority"
                id="priorityMedium"
                value="Medium"
              />
              <label className="form-check-label" htmlFor="priorityMedium">
                Medium
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="priority"
                id="priorityLow"
                value="Low"
              />
              <label className="form-check-label" htmlFor="priorityLow">
                Low
              </label>
            </div>
          </div>
        </div>
        <div className="custom-control custom-switch">
          <input
            id="addDate"
            type="checkbox"
            className="custom-control-input"
            data-toggle="collapse"
            data-target="#collapseExample"
          />
          <label className="custom-control-label" htmlFor="addDate">
            Add a date?
          </label>
        </div>
        <div className="collapse" id="collapseExample">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <div className="form-inline">
              <input
                type="date"
                className="form-control"
                id="date"
                name="date"
              />
              <input
                type="time"
                className="form-control"
                id="dateTime"
                name="dateTime"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">Due Date</label>
            <div className="form-inline">
              <input
                type="date"
                className="form-control"
                id="dueDate"
                name="dueDate"
              />
              <input
                type="time"
                className="form-control"
                id="dueDateTime"
                name="dueDateTime"
              />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
}
