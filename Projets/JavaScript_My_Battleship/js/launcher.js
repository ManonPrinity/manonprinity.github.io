function init_storage()
{
    localStorage.setItem("difficulty", 2);
    localStorage.setItem("turn", 1);
}

function select_difficulty(n, obj)
{
    document.querySelector("#difficulty .selected").className = "";
    obj.className = "selected";
    localStorage.setItem("difficulty", n);
}

function select_turn(n, obj)
{
    document.querySelector("#turn .selected").className = "";
    obj.className = "selected";
    localStorage.setItem("turn", n);
}
