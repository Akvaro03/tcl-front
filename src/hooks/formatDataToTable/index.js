function formatDataToTable(json, setOts) {
    json.forEach((element, index) => {
        let UsersJson = element.Users !== null ? JSON.parse(element.Users) : { data: [] };
        if (UsersJson.data.length > 0) {
            element.Users = "";
            UsersJson.data.forEach(name => {
                element.Users += name;
                if (UsersJson.data[UsersJson.data.length - 1] !== name) {
                    element.Users += ", ";
                }
            })
        } else {
            element.Users = "Ningun Colaborador selecionado"
        }

        json[index] = element;
    });
    setOts(json)
}

export default formatDataToTable;