import React, {useState, useEffect} from "react";
import "./DeleteWarning.css";
import {useParams, useNavigate, Link} from "react-router-dom";
import supabase from "../config/supabseClient";

const DeleteWarning = () => {
    const {id} = useParams();
    const navigate = useNavigate();
    const [creator, setCreator] = useState({name: ""});

    const fetchCreator = async () => {
        const {data, error} = await supabase.from("creator").select().eq("id", id).single();

        if (error) {
            navigate("/", {replace: true});
        }

        if (data) {
            setCreator({name: data.name});
        }
    };

    useEffect(() => {
        fetchCreator();
    }, [id, navigate]);

    const handleDelete = async () => {
        const {error} = await supabase.from("creator").delete().eq("id", id).select();

        if (error) {
            console.log(error);
        }

        navigate("/");
    };

    return (
        <div className="center-container">
            <h3>
                ⚠️ WAIT!!!! ⚠️</h3>
            <br/>
            <p>Are you sure you want to delete
            </p>
            <p>{
                creator.name
            }???
            </p>
            <Link to="/">
                <button type="button" className="show-btn mt-5">
                    NAH, NEVER MIND!
                </button>
            </Link>
            <button type="button" className="show-btn secondary"
                onClick={handleDelete}>
                YES, TOTALLY SURE!
            </button>
        </div>
    );
};

export default DeleteWarning;
