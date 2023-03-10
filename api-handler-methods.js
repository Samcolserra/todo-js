const token = localStorage.getItem("token");

export const getToDosWithApi = async (todoItems) => {
    const httpString = `http://localhost:5019/api/v1/todos`;

    const responseResult = await fetch(httpString, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
    
    todoItems.splice(0, todoItems.length);
    todoItems.push(...convertBackendModel(await responseResult.json()));
}

export const postToDoWithApi = async (name, description) => {
    const httpString = `http://localhost:5019/api/v1/todos`;

    const responseResult = await fetch(httpString, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _name: name,
            _description: description,
            _status: 0
        }) 
    });

    return await responseResult.json();
}

export const putToDoWithApi = async (id, newName, newDescription, status) => {
    const httpString = `http://localhost:5019/api/v1/todos/${id}`;

    await fetch(httpString, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            _name: newName,
            _description: newDescription,
            _status: status
        }) 
    });
}

export const deleteToDoWithApi = async (id) => {
    const httpString = `http://localhost:5019/api/v1/todos/${id}`;

    await fetch(httpString, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const postSignupWithApi = async (body) => {
    const httpString = `http://localhost:5019/api/v1/signup`;

    const responseResult = await fetch(httpString, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });
    
    const responseData = await responseResult.json();
    localStorage.setItem("token", responseData._token);
}

export const postSigninWithApi = async (body) => {
    const httpString = `http://localhost:5019/api/v1/signin`;

    const responseResult = await fetch(httpString, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });

    const responseData = await responseResult.json();
    localStorage.setItem("token", responseData._token);
}

const convertBackendModel = (array) => {
    const newModelArray = array.map(element => {
        const newElement = {
            id: element.id, 
            name: element._name,
            description: element._description,
            status: element._status
        }
        return newElement;
    });
    return newModelArray;
}