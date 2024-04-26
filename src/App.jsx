import { useEffect, useState } from "react";
import {
    MDBCard,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import "./App.css";

function App() {
    const [name, setName] = useState("");
    const [data, setData] = useState(null);
    const API_KEY = "de21c62cc5c8f466dcaa7f0ed7e01bed";

    useEffect(() => {
        if (name !== "") {
            const URL = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`;
            fetch(URL)
                .then((res) => {
                    if (res.status === 200) {
                        return res.json();
                    } else {
                        return null;
                    }
                })
                .then((data) => {
                    setData(data);
                });
        }
    }, [name]);

    return (
        <>
            <MDBContainer className="flex items-center gap-4">
                <label className="text-white" htmlFor="City">
                    City :
                </label>
                <input
                    className="text-white p-2"
                    type="text"
                    placeholder="Search...."
                    onChange={(e) => setName(e.target.value)}
                />
            </MDBContainer>
            {/* Made a condition check from breaking the code. The card will be visible with valid city name only. */}
            {data !== null && (
                <section
                    className="vh-100 w-96 my-4"
                    style={{ backgroundColor: "#f5f6f7" }}
                >
                    <MDBContainer className="h-100">
                        <MDBRow className="justify-content-center align-items-center h-100">
                            <MDBCol md="10" lg="8" xl="6">
                                <MDBCard
                                    className="bg-dark"
                                    style={{ borderRadius: "40px" }}
                                >
                                    <div
                                        className="bg-image"
                                        style={{ borderRadius: "35px" }}
                                    >
                                        <MDBCardImage
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-weather/draw1.webp"
                                            className="card-img"
                                            alt="weather"
                                        />
                                        <div
                                            className="mask"
                                            style={{
                                                backgroundColor:
                                                    "rgba(190, 216, 232, .5)",
                                            }}
                                        ></div>
                                    </div>
                                    <div className="card-img-overlay text-dark p-5">
                                        <MDBTypography
                                            tag="h4"
                                            className="mb-0"
                                        >
                                            {data?.name}
                                        </MDBTypography>
                                        <p className="display-2 my-3">
                                            {data?.main.temp}°C
                                        </p>
                                        <p className="mb-2">
                                            Feels Like:{" "}
                                            <strong>
                                                {data?.main.feels_like}
                                            </strong>
                                        </p>
                                        <p className="mb-2">
                                            Wind Speed:{" "}
                                            <strong>{data?.wind.speed}</strong>
                                        </p>
                                        <p className="mb-2">
                                            Humidity:{" "}
                                            <strong>
                                                {data?.main.humidity}
                                            </strong>
                                        </p>
                                        <MDBTypography tag="h5">
                                            {data?.weather[0].description}
                                        </MDBTypography>
                                    </div>
                                </MDBCard>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </section>
            )}
        </>
    );
}

export default App;
