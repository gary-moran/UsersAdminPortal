/**************************************************************************
*
*  System:    Users Admin portal
*  Module:    Web
*  Date:      02 AUG 2020
*  Author:    Gary Moran (GM)
*  Function:  site.js
*  Notes:     
*
*                   : History of Amendments :
*  Date        Name        Brief description                
*  ----------- ----------  ---------------------------------------------
*  02 AUG 2020 GM          Created
************************************************************************/

// Navigation Bar component
Vue.component("navigation-bar", {
    props: {
        name: String
    },
    template: `    
    <!-- Navigation -->
    <div>
        <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
            <div class="container">
                <a class="navbar-brand" href="#">{{name}}</a>
                <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbar"
                    aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
            </div>
        </nav> 
    </div>
    `
})

// Page Footer component
Vue.component("page-footer", {
    props: {
        name: String
    },
    template: `    
    <div>    
        <hr />
        <footer class="footer">
            <div class="container">
                <span class="text-muted">&copy; 2020 - {{name}}</span>
            </div>
        </footer>
    </div>
    `
})

/**************************************************************************
*
*  Date:      07 JUN 2020
*  Author:    Gary Moran (GM)
*  Function:  Vue Data Table Component
*  Notes:     
*
*                   : History of Amendments :
*  Date        Name        Brief description                
*  ----------- ----------  ---------------------------------------------
*  07 JUN 2020 GM          Created
*  02 AUG 2020 GM          Modified for Users Admin Portal
************************************************************************/
Vue.component("vue-data-table", {
    props: {
        dataSource: String,
        showEntries: {
            type: Array,
            validator: (prop) => prop.every(e => typeof e === 'number'),
            default: [10, 25, 50, 100]
        },
        columnNames: { type: Array, default: function () { return [] } },
        hideKey: { type: Boolean, default: false },
        numericColumns: { type: Array, default: function () { return [] } },
        maxPageButtons: { type: Number, default: 5 }
    },
    template:
        `
    <div>
        <div class="container">
            <span class="float-right">
                <label>
                    Search on last name:&nbsp;
                    <input ref="search" type="search" v-model="filter">
                </label>
            </span>            
        </div>
        <div v-if="apiError">
            <p class="text-center text-danger">Web API issue: {{apiErrorText}}</p>
        </div>
        <table class="table table-hover">
            <thead>
                <tr>
                    <th v-for="col in colNames" :key="col" 
                        :class="col == hiddenColumnName ? 'd-none' : '' ">{{col}}
                        <i v-if="col == sortColumnName && ascending" class="fas fa-angle-up"></i>
                        <i v-if="col == sortColumnName && descending" class="fas fa-angle-down"></i>                        
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in currentRows"  :key="row[0]" @click="selectRow(row)" :class="row == selectedRow ? 'bg-secondary' : ''">
                    <td v-for="col in columns"  :key="col" :class="col == hiddenColumn ? 'd-none' : '' ">{{row[col]}}</td>
                </tr>
            </tbody>
        </table>
        <div>
            Showing {{ currentStartRow }} to {{ currentEndRow }} of {{ totalRows }} entries
        </div>
    </div>
    `,
    mounted() {        
        axios
            .get(this.dataSource)
            .then(response => {
                this.dataRows = response.data.data;
                if (this.hideKey) {
                    this.hiddenColumn = Object.keys(this.dataRows[0])[0];
                    this.hiddenColumnName = Object.keys(this.dataRows[0])[0];
                }
                this.rowsPerPage = this.showEntries[0];
            })
            .catch(error => {
                this.apiError = true;
                this.apiErrorText = error.message;
            });
        this.focusInput();
    },
    data: function () {
        return {
            apiError: false,
            apiErrorText: '',
            rowsPerPage: 10,
            ascending: false,
            sortColumn: '',
            sortColumnName: '',
            selectedRow: '',
            dataRows: [],
            page: 1,
            hiddenColumn: '',
            hiddenColumnName: '',
            filter: ''
        }
    },
    computed: {
        rows: function () {
            this.unSelect();
            if (this.filter == '')
                return [];
            else {
                let filterRegEx = new RegExp(this.filter, 'i');
                return this.dataRows.filter(el => {
                    return el.lastName.match(filterRegEx);
                });
            }
        },
        columns: function () {
            if (this.rows.length == 0) {
                return [];
            }
            return Object.keys(this.rows[0]);
        },
        colNames: function () {
            if (this.columnNames === undefined)
                return this.columns;

            let tempColNames = [];
            var i;
            for (i = 0; i < this.columns.length; i++) {
                if (i < this.columnNames.length)
                    tempColNames.push(this.columnNames[i])
                else
                    tempColNames.push(this.columns[i]);
            }
            if (this.hideKey)
                this.hiddenColumnName = tempColNames[0];
            return tempColNames;
        },
        descending: function () {
            return !this.ascending;
        },
        maxPages: function () {
            return Math.ceil(this.totalRows / this.rowsPerPage);
        },
        totalRows: function () {
            return this.rows.length;
        },
        currentRowsCount: function () {
            let rowsPerPage = Number(this.rowsPerPage);
            return this.page > Math.floor(this.totalRows / rowsPerPage) ? this.totalRows % rowsPerPage : rowsPerPage;
        },
        startRowIndex: function () {
            return (this.page - 1) * this.rowsPerPage;
        },
        endRowIndex: function () {
            return (1 * this.startRowIndex) + (1 * this.currentRowsCount);
        },
        currentRows: function () {
            if (this.totalRows > 0)
                return this.rows.slice(this.startRowIndex, this.endRowIndex);
            else
                return this.rows;
        },
        currentStartRow: function () {
            if (this.totalRows == 0)
                return 0;
            else
                return this.startRowIndex + 1;
        },
        currentEndRow: function () {
            return this.startRowIndex + this.currentRowsCount;
        },
        displayNumberOfPageButtons: function () {
            if (this.maxPages < this.maxPageButtons + 1)
                return this.maxPages;
            else
                return this.maxPageButtons;
        },
        displayPageButtonsOffset: function () {
            let result = 0;
            if (!this.maxPages <= this.displayNumberOfPageButtons) {
                result = (this.page - this.displayNumberOfPageButtons);
                result = result < 0 ? 0 : result;
            }
            return result;
        }
    },
    methods: {
        focusInput() {
            this.$refs.search.focus();
        },
        sortTable: function (col) {
            let sortCol = this.columns[this.colNames.indexOf(col)];

            if (this.sortColumn === sortCol) {
                this.ascending = !this.ascending;
            } else {
                this.ascending = true;
                this.sortColumn = sortCol;
                this.sortColumnName = col;
            }

            var ascending = this.ascending;

            if (this.numericColumns !== undefined && this.numericColumns.indexOf(sortCol) > -1) {
                this.rows.sort(function (a, b) {
                    return ascending ? a[sortCol] - b[sortCol] : b[sortCol] - a[sortCol]
                })
            }
            else {
                this.rows.sort(function (a, b) {
                    if (a[sortCol] > b[sortCol]) {
                        return ascending ? 1 : -1
                    } else if (a[sortCol] < b[sortCol]) {
                        return ascending ? -1 : 1
                    }
                    return 0;
                })
            }
        },
        unSelect: function () {
            this.selectedRow = '';
            this.$emit('unselect-row');
        },
        selectRow: function (row) {
            if (this.selectedRow !== row) {
                this.selectedRow = row;
                this.$emit('select-row', row);
            }
            else {
                this.unSelect();
            }
        },
        movePrevious: function () {
            if (this.page > 1)
                this.page -= 1;
        },
        moveNext: function () {
            if (this.page < this.maxPages)
                this.page += 1;
        },
        movePage: function (page) {
            this.page = page;
        },
        moveLast: function () {
            this.page = this.maxPages;
        }
    }
})

/**************************************************************************
*
*  Date:      02 AUG 2020
*  Author:    Gary Moran (GM)
*  Function:  Vue App
*  Notes:     
*
*                   : History of Amendments :
*  Date        Name        Brief description                
*  ----------- ----------  ---------------------------------------------
*  02 AUG 2020 GM          Created
************************************************************************/
var app = new Vue({
    el: '#app',
    data: function () {
        return {
            selectedRow: ''
        }
    },
    methods: {
        selectRow: function (row) {
            this.selectedRow = row.lastName + ', ' + row.firstName;
        },
        unselectRow: function (row) {
            this.selectedRow = '';
        }
    }
});
