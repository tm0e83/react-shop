import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setGender, setFirstname, setLastname } from 'userSlice';

const BuyPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gender = useSelector(state => state.user.gender);
  const firstname = useSelector(state => state.user.firstname);
  const lastname = useSelector(state => state.user.lastname);

  const onGenderChange = e => {
    dispatch(setGender(parseInt(e.target.value)));
  };

  const onFirstnameChange = e => {
    dispatch(setFirstname(e.target.value));
  };

  const onLastnameChange = e => {
    dispatch(setLastname(e.target.value));
  };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="page-headline">Bestelladresse</div>

      <div className="mb-4 flex gap-6">
        <div className="flex gap-1 items-center">
          <label htmlFor="gender-mrs">Frau</label>
          <input
            type="radio"
            id="gender-mrs"
            name="gender"
            value={1}
            checked={gender === 1}
            onChange={onGenderChange}
          />
        </div>

        <div className="flex gap-1 items-center">
          <label htmlFor="gender-mr">Herr</label>
          <input
            type="radio"
            id="gender-mr"
            name="gender"
            value={2}
            checked={gender === 2}
            onChange={onGenderChange}
          />
        </div>
      </div>

      <div className="mb-4 flex gap-3">
        <div>
          <label htmlFor="firstname">Vorname</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={onFirstnameChange}
          />
        </div>

        <div>
          <label htmlFor="lastname">Nachname</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={onLastnameChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="street">Straße / Hausnummer</label>
        <input
          type="text"
          id="street"
        />
      </div>

      <div className="mb-4 flex gap-3">
        <div>
          <label htmlFor="zipcode">PLZ</label>
          <input
            type="text"
            id="zipcode"
          />
        </div>

        <div>
          <label htmlFor="city">Stadt</label>
          <input
            type="text"
            id="city"
          />
        </div>
      </div>

      <div className="flex gap-4 justify-between">
        <button
          onClick={() => navigate(-1)}
          className="button hollow"
        >
          Zurück
        </button>
        <button className="button">Weiter</button>
      </div>
    </div>
  );
};

export default BuyPage;
