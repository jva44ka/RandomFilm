const getGenresString = (film) => {
    let result = "";
    if(film.filmsGenres && film.filmsGenres.length > 0) {
        film.filmsGenres.forEach(item => {
                result += item.genre.name + ", ";
            }
        );
        return result.substring(0, result.length - 2);
    }
    else{
        return result;
    }
};

export default getGenresString;