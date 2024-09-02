import { useMutation } from "@tanstack/react-query";
import { UpdateMovieData } from "../api/types";
import { updateMovie } from "../api";

export const useUpdateMovieMutation = () => {
    return useMutation({
        mutationFn: (movieData: UpdateMovieData) => {
            const formData = new FormData();
            formData.append('title', movieData.title);
            formData.append('description', movieData.description);
            formData.append('duration', movieData.duration);
            formData.append('genre', movieData.genre);
            formData.append('trended', movieData.trended.toString());

            if (movieData.image) {
                formData.append('image', movieData.image);
            }

            return updateMovie(movieData.movieId, formData);
        }
    });
};
