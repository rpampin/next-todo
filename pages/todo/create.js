import Layout from "../../components/Layout";

export default function Create() {
  return (
    <Layout>
      <form autoComplete="off">
        <div class="form-group">
          <label for="folder">Folder</label>
          <select class="form-control" id="folder"></select>
        </div>
        <div class="form-group">
          <label for="title">Title</label>
          <input class="form-control" id="title" />
        </div>
        <div class="form-group">
          <label for="notes">Notes</label>
          <textarea class="form-control" id="notes" />
        </div>
        <div class="form-group">
          <label for="input-type">Priority</label>
          <div id="input-type">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityHigh"
                value="High"
              />
              <label class="form-check-label" for="priorityHigh">
                High
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityMedium"
                value="Medium"
              />
              <label class="form-check-label" for="priorityMedium">
                Medium
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                name="priorityOptions"
                id="priorityLow"
                value="Low"
              />
              <label class="form-check-label" for="priorityLow">
                Low
              </label>
            </div>
          </div>
        </div>
        <div class="custom-control custom-switch">
          <input
            type="checkbox"
            class="custom-control-input"
            id="addDeadline"
          />
          <label class="custom-control-label" for="addDeadline">
            Add deadline?
          </label>
        </div>
        <div class="form-group">
          <label for="date">Date</label>
          <input type="Date" class="form-control" id="date" />
        </div>
        <div class="form-group">
          <label for="dueDate">Due Date</label>
          <input type="Date" class="form-control" id="dueDate" />
        </div>
        <button type="submit" class="btn btn-primary">
          Submit
        </button>
      </form>
    </Layout>
  );
}
