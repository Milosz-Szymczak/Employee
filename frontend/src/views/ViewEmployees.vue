<template>
    <main>
        <Navbar />
        <div class="container-fluid" style="padding-left: 10%; padding-right: 10%;">
            <div class="row align-items-center mb-3">
                <h1 class="text-start">Lista pracowników</h1>
                <div class="col-lg-6">
                    <a href="/add" class="btn btn-primary mb-3">Dodaj pracownika</a>
                </div>
                <div class="col-lg-6 text-end">
                    <div class="d-inline-block">
                        <label for="search" class="form-label mb-0">Szukaj pracownika:</label>
                        <input type="text" id="search" class="form-control" v-model="searchQuery"
                            @input="searchEmployees" placeholder="Wpisz imię i nazwisko" />
                    </div>
                </div>
            </div>

            <table id="employee-table" class="table  table-striped ">
                <thead>
                    <tr>
                        <th scope="col" @click="sortTable('id')">Id <i :class="getSortIcon('id')"></i></th>
                        <th scope="col" @click="sortTable('fullName')">Imię i nazwisko <i
                                :class="getSortIcon('fullName')"></i></th>
                        <th scope="col" @click="sortTable('lastMedicalExamDate')">Ostatnie badanie lekarskie <i
                                :class="getSortIcon('lastMedicalExamDate')"></i></th>
                        <th scope="col" @click="sortTable('bhpExamDate')">Data badania BHP <i
                                :class="getSortIcon('bhpExamDate')"></i></th>
                        <th scope="col" @click="sortTable('ppk')">Czy należy do PPK? <i :class="getSortIcon('ppk')"></i>
                        </th>
                        <th scope="col" @click="sortTable('insurance.insuranceName')">Ubezpieczenie grupowe <i
                                :class="getSortIcon('insurance.insuranceName')"></i></th>
                        <th scope="col" @click="sortTable('multisport.packageName')">MultiSport <i
                                :class="getSortIcon('multisport.packageName')"></i></th>
                        <th scope="col" @click="sortTable('remarks')">Uwagi <i :class="getSortIcon('remarks')"></i></th>
                        <th scope="col">Funkcje</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="employee in paginatedEmployees" :key="employee.id">
                        <th scope="row">{{ employee.id }}</th>
                        <td>{{ employee.fullName }}</td>
                        <td>{{ employee.lastMedicalExamDate }}</td>
                        <td>{{ employee.bhpExamDate }}</td>
                        <td>{{ employee.ppk ? 'Tak' : 'Nie' }}</td>
                        <td>{{ employee.insurance ? employee.insurance.insuranceName + ' - ' +
                            employee.insurance.insuranceRate + ' zł' : 'Brak ubezpieczenia' }}</td>
                        <td>{{ employee.multisport ? employee.multisport.packageName + ' - ' +
                            employee.multisport.packageValue + ' zł' : 'Brak pakietu' }}</td>
                        <td>
                            <textarea id="remark" type="text" name="remark" class="form-control" placeholder="Brak uwag."
                                v-model="employee.remarks" rows="4" cols="60" wrap="soft" disabled>
                                    </textarea>
                        </td>
                        <td>
                            <a class="btn btn-primary" :href="`/edit/${employee.id}`">Edytuj</a>
                            <button class="btn btn-danger mx-2" @click="deleteEmployee(employee.id)">Usuń</button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div class="d-flex justify-content-between align-items-center mt-3">
                <nav aria-label="Page navigation">
                    <ul class="pagination mb-0">
                        <li class="page-item" :class="{ disabled: currentPage === 1 }">
                            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Poprzednia</a>
                        </li>
                        <li class="page-item" v-for="page in totalPages" :key="page"
                            :class="{ active: page === currentPage }">
                            <a class="page-link" href="#" @click.prevent="changePage(page)">{{ page }}</a>
                        </li>
                        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Następna</a>
                        </li>
                    </ul>
                </nav>
                <div>
                    <label for="itemsPerPage" class="form-label mb-0">Ilość wyświetlanych pracowników:</label>
                    <select id="itemsPerPage" class="form-select form-select-sm" v-model.number="itemsPerPage">
                        <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
                            {{ option }}
                        </option>
                    </select>
                </div>
            </div>
        </div>
    </main>

  <footer class="mt-auto">
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.05);">
      © 2024 Copyright:
      <a class="text-body" href="https://www.ambsoft.pl/">amb software IT</a>
    </div>
  </footer>
</template>

<script>
import Navbar from "../components/Navbar.vue";

export default {
    name: "ViewEmployees",
    components: {
        Navbar,
    },
    data() {
        return {
            employees: [],
            currentPage: 1,
            itemsPerPage: 10,
            itemsPerPageOptions: [5, 10, 15, 20],
            sortKey: '',
            sortOrder: 'asc',
            searchQuery: '',
        };
    },
    computed: {
        paginatedEmployees() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.sortedEmployees.slice(start, end);
        },
        sortedEmployees() {
            let sorted = [...this.employees];
            if (this.sortKey) {
                sorted.sort((a, b) => {
                    let aValue = this.getNestedValue(a, this.sortKey);
                    let bValue = this.getNestedValue(b, this.sortKey);

                    if (this.sortOrder === 'asc') {
                        return aValue > bValue ? 1 : -1;
                    } else {
                        return aValue < bValue ? 1 : -1;
                    }
                });
            }
            return sorted;
        },
        totalPages() {
            return Math.ceil(this.employees.length / this.itemsPerPage);
        },
    },
    beforeMount() {
        this.getEmployees();
    },
    methods: {
        getEmployees() {
            fetch("http://localhost:8085/api/employee")
                .then((res) => res.json())
                .then((data) => {
                    this.employees = data;
                    console.log(data);
                });
        },
        searchEmployees() {
            fetch(`http://localhost:8085/api/employee/findEmployee/${this.searchQuery}`)
                .then((res) => res.json())
                .then((data) => {
                    this.employees = data;
                });
        },
        deleteEmployee(id) {
            fetch(`http://localhost:8085/api/employee/deleteEmployee/${id}`, {
                method: "DELETE",
            }).then(() => {
                this.getEmployees();
            });
        },
        changePage(pageNumber) {
            if (pageNumber >= 1 && pageNumber <= this.totalPages) {
                this.currentPage = pageNumber;
            }
        },
        sortTable(key) {
            if (this.sortKey === key) {
                this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
            } else {
                this.sortKey = key;
                this.sortOrder = 'asc';
            }
        },
        getSortIcon(key) {
            if (this.sortKey === key) {
                return this.sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill';
            }
            return 'bi bi-caret-down';
        },
        getNestedValue(obj, key) {
            return key.split('.').reduce((o, k) => (o || {})[k], obj);
        },
    },
};
</script>

<style>
.table th {
    cursor: pointer;
}
</style>