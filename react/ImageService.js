

export async function generateImages(model){
    var fd = new FormData();
    fd.append('file', model)
    const response = await fetch(`/api/user`, {
        method: 'POST',
        headers: {'Content-Type': 'multipart/form-data'},
        data: fd
      })
    return await response.json();
}