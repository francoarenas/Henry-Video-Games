export function validate(errors){
    let error = {}
    
    if(!errors.name) error.name = 'Name is require'
    if(!errors.description) error.description = 'Description is require'
    if(!errors.platforms.length) error.platforms = 'Select at least one platforms'
    if(!errors.genres.length) error.genres = 'Select at least one genres'
    if(errors.rating < 0 || errors.rating > 5) error.rating = 'rating between 0 and 5'
    
    return error
}