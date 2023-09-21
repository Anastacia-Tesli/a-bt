import { useEffect, useState } from 'react';
import Select from '../Select/Select';
import styles from './App.module.scss';
const data = require('../../data/data.json');

function App() {
  const [submit, setSubmit] = useState(false);
  const [output, setOutput] = useState([]);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [gender, setGender] = useState('');
  const [color, setColor] = useState('');
  const [behavior, setBehavior] = useState('');

  const names = data.map((element) => element.name);
  const types = Array.from(new Set(data.map((element) => element.type)));
  const genders = Array.from(new Set(data.map((element) => element.gender)));
  const colors = Array.from(new Set(data.map((element) => element.features[0])));
  const behaviors = Array.from(new Set(data.map((element) => element.features[1])));

  const filterAnimals = () => {
    const result = data.filter((element) => {
      return (
        (element.name.toLowerCase() === name.toLowerCase() || !name) &&
        (element.type.toLowerCase() === type.toLowerCase() || !type) &&
        (element.gender.toLowerCase() === gender.toLowerCase() || !gender) &&
        (element.features[0].toLowerCase() === color.toLowerCase() || !color) &&
        (element.features[1].toLowerCase() === behavior.toLowerCase() || !behavior)
      );
    });
    return result;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmit(true);
  };
  useEffect(() => {
    setOutput(filterAnimals());
    if (output.length === 0 && (name || type || gender || color || behavior)) {
      setError(true);
    } else setError(false);
    setSubmit(false);
  }, [submit]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Find your animal</h1>
      <form className={styles.form} onSubmit={onSubmit}>
        <Select setOption={setName} label='Name' options={names} />
        <Select setOption={setType} label='Type' options={types} />
        <Select setOption={setGender} label='Gender' options={genders} />
        <Select setOption={setColor} label='Color' options={colors} />
        <Select setOption={setBehavior} label='Behaviour' options={behaviors} />
        <button className={styles.button}>Search</button>
      </form>
      <p>Your animal might be...</p>
      {!error &&
        output.map((element) => (
          <p
            className={styles.animal}
            title={`age: ${element.age}; type: ${element.type}; gender: ${
              element.gender
            }; features: ${element.features[0]}, ${element.features[1]}${
              element.breed ? '; breed' : ''
            }`}
            key={element.name}
          >
            {element.name}
          </p>
        ))}
      {error && (
        <p className={styles.animal}>
          Sorry, there's no such animal for you! Try to set other options
        </p>
      )}
    </main>
  );
}

export default App;
