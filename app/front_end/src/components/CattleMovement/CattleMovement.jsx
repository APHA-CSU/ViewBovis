import { useEffect, useState } from "react";

const CattleMovement = ({ searchInput }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchSample, setSearchSample] = useState("")
  const [jsonData, setjsonData] = useState({});

  const handleChange = (event) => {
    setsearchInput(event.target.value); // 1 create state
}

const handleSubmit = (event) => {
    event.preventDefault();
    setSearchSample(searchInput);
    setsearchInput("");
}

  useEffect(() => {
    fetch(`/sample/movements?sample_name=${searchInput}`)
      .then((response) => {
        return response.json();
      })
      .then(({ data }) => {
        setjsonData(data);
      });
  }, [searchInput]);

  return <h1>Cattle Movement</h1>;
};

export default CattleMovement;
