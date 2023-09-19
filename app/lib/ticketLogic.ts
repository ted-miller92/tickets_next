// toggle active status
export async function updateActiveStatus(data: any) {
    await fetch("/api/allTickets", {
        method: "PUT",
        body: JSON.stringify(data)
    });
}