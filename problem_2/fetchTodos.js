

var dataSet = [];


// fetching Data from jsonplaceholder 


fetch('https://jsonplaceholder.typicode.com/todos/')
    .then(response => response.json())
    .then(data => {
        for (var i = 0; i < data.length; i++) {
            dataSet.push(Object.values(data[i]))
        }
        $(document).ready(function () {
            $('#myTable').DataTable({
                data: Object.values(dataSet),
                columns: [
                    { title: "userId" },
                    { title: "id" },
                    { title: "title" },
                    { title: "completed" },

                ]
            });
        });

    })
    .catch(error => console.error(error))

