export default function getValues() {
  let taskValues = {
    id: localStorage.length,
    name: form.name.value,
    description: form.description.value,
    isImportant: form.isImportant.checked,
    date: form.date.value,
    periodicity: form.periodicity.value,
    checked: false,
    status: "Active",
  };

  let json = JSON.stringify(taskValues);

  localStorage.setItem(taskValues.id, json);
}
