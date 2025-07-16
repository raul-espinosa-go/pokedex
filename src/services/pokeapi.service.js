import axios from "axios";

const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon by ID:", error);
    throw error;
  }
}

export async function getPokemonSpeciesById(id) {
  try {
    const response = await axios.get(`${BASE_URL}/pokemon-species/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching Pokemon species by ID:", error);
    throw error;
  }
}