import React, { useEffect, useState } from "react";
import { Container, Table, Button, Form, InputGroup } from "react-bootstrap";
import { toast } from "react-toastify";

export const ManageUser = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");

    // Fetch Users from API
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BASE_URL}/registation`);  // Corrected URL
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Error fetching users:", error);
                toast.error("Failed to load users");
            }
        };
        fetchUsers();
    }, []);

    // Delete User Function (Assuming API has a DELETE endpoint)
    const deleteUser = async (id) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BASE_URL}/registation/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Failed to delete user");
            }

            const updatedUsers = users.filter(user => Number(user.id) !== Number(id));
            setUsers(updatedUsers);
            toast.success("User deleted successfully");
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user");
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Manage Users</h2>

            {/* Search Bar */}
            <InputGroup className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </InputGroup>

            {/* User Table */}
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users
                            .filter((user) =>
                                user.firstname.toLowerCase().includes(search.toLowerCase()) ||
                                user.lastname.toLowerCase().includes(search.toLowerCase()) ||
                                user.username.toLowerCase().includes(search.toLowerCase())
                            )
                            .map((user, index) => (
                                <tr key={user.id}>
                                    <td>{index + 1}</td>
                                    <td>{user.firstname}</td>
                                    <td>{user.lastname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Button variant="danger" size="sm" onClick={() => deleteUser(user.id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center text-muted">No users found</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Container>
    );
};
