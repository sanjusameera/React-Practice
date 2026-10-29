import {
  useCallback,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  AgGridReact,
  AgGridProvider,
} from "ag-grid-react";

import {
  AllEnterpriseModule,
} from "ag-grid-enterprise";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../App.css";

const modules = [AllEnterpriseModule];

/* -------------------------------------------------------
   SAMPLE DATA
------------------------------------------------------- */

const initialEmployees = [
  {
    id: 1,
    name: "John",
    department: "Engineering",
    role: "Frontend Developer",
    salary: 45000,
    status: "Active",
    email: "john@example.com",
    projects: [
      { project: "Engineering Hub", hours: 40 },
      { project: "Admin Dashboard", hours: 25 },
    ],
  },
  {
    id: 2,
    name: "Renuka",
    department: "IT",
    role: "Backend Developer",
    salary: 90000,
    status: "Active",
    email: "renuka@example.com",
    projects: [
      { project: "API Development", hours: 35 },
      { project: "Database Migration", hours: 20 },
    ],
  },
  {
    id: 3,
    name: "Rahul",
    department: "Product",
    role: "Product Manager",
    salary: 34009,
    status: "Active",
    email: "rahul@example.com",
    projects: [
      { project: "Product Planning", hours: 30 },
    ],
  },
  {
    id: 4,
    name: "Bharath",
    department: "Sales",
    role: "Sales Executive",
    salary: 85000,
    status: "Inactive",
    email: "bharath@example.com",
    projects: [
      { project: "Enterprise Sales", hours: 25 },
    ],
  },
  {
    id: 5,
    name: "Menaka",
    department: "Testing",
    role: "QA Engineer",
    salary: 40000,
    status: "Active",
    email: "menaka@example.com",
    projects: [
      { project: "Regression Testing", hours: 32 },
      { project: "Automation", hours: 18 },
    ],
  },
];

/* -------------------------------------------------------
   CUSTOM CELL RENDERER
   Chunk 1
------------------------------------------------------- */

function StatusRenderer(props) {
  const status = props.value;

  return (
    <span
      className={
        status === "Active"
          ? "status active"
          : "status inactive"
      }
    >
      {status}
    </span>
  );
}

/* -------------------------------------------------------
   ACTION CELL RENDERER
------------------------------------------------------- */

function ActionRenderer(props) {
  return (
    <div className="action-buttons">
      <button
        onClick={() => props.onEdit(props.data)}
      >
        Edit
      </button>

      <button
        className="delete"
        onClick={() => props.onDelete(props.data.id)}
      >
        Delete
      </button>
    </div>
  );
}

/* -------------------------------------------------------
   DETAIL GRID
   Chunk 6 - Master / Detail
------------------------------------------------------- */

function AgGrid() {
  const gridRef = useRef(null);

  const [rowData, setRowData] =
    useState(initialEmployees);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [selectedCount, setSelectedCount] =
    useState(0);

  /* -----------------------------------------------------
     API SIMULATION
     Chunk 4
  ----------------------------------------------------- */

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      /*
        In a real application this would be:

        const response = await fetch(
          "http://localhost:8000/employees"
        );

        const data = await response.json();
      */

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      setRowData(initialEmployees);
    } catch (err) {
      setError("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }, []);

  /* -----------------------------------------------------
     GRID READY
     Chunk 3
  ----------------------------------------------------- */

  const onGridReady = useCallback((params) => {
    gridRef.current = params.api;

    console.log("Grid is ready");

    fetchEmployees();
  }, [fetchEmployees]);

  /* -----------------------------------------------------
     EDIT
     Chunk 1 + CRUD
  ----------------------------------------------------- */

  const handleEdit = useCallback((employee) => {
    console.log("Editing:", employee);

    gridRef.current?.startEditingCell({
      rowIndex: rowData.findIndex(
        (row) => row.id === employee.id
      ),
      colKey: "name",
    });
  }, [rowData]);

  /* -----------------------------------------------------
     DELETE
     Chunk 4
  ----------------------------------------------------- */

  const handleDelete = useCallback((id) => {
    setRowData((currentRows) =>
      currentRows.filter((row) => row.id !== id)
    );

    console.log("Deleted employee:", id);
  }, []);

  /* -----------------------------------------------------
     ADD EMPLOYEE
     Chunk 4
  ----------------------------------------------------- */

  const addEmployee = useCallback(() => {
    const newEmployee = {
      id: Date.now(),
      name: "New Employee",
      department: "Engineering",
      role: "Developer",
      salary: 50000,
      status: "Active",
      email: "new@example.com",
      projects: [],
    };

    setRowData((currentRows) => [
      ...currentRows,
      newEmployee,
    ]);
  }, []);

  /* -----------------------------------------------------
     SELECTION
     Chunk 2
  ----------------------------------------------------- */

  const rowSelection = useMemo(() => {
    return {
      mode: "multiRow",
      checkboxes: true,
      headerCheckbox: true,
    };
  }, []);

  const onSelectionChanged = useCallback((params) => {
    const selectedRows =
      params.api.getSelectedRows();

    setSelectedCount(selectedRows.length);

    console.log(
      "Selected rows:",
      selectedRows
    );
  }, []);

  /* -----------------------------------------------------
     PROGRAMMATIC SELECTION
     Chunk 2
  ----------------------------------------------------- */

  const selectAll = useCallback(() => {
    gridRef.current?.selectAll();
  }, []);

  const clearSelection = useCallback(() => {
    gridRef.current?.deselectAll();
  }, []);

  /* -----------------------------------------------------
     DELETE SELECTED
     Chunk 2 + CRUD
  ----------------------------------------------------- */

  const deleteSelected = useCallback(() => {
    const selectedRows =
      gridRef.current?.getSelectedRows() || [];

    const selectedIds =
      selectedRows.map((row) => row.id);

    setRowData((currentRows) =>
      currentRows.filter(
        (row) => !selectedIds.includes(row.id)
      )
    );

    gridRef.current?.deselectAll();
  }, []);

  /* -----------------------------------------------------
     EXPORT
     Chunk 6
  ----------------------------------------------------- */

  const exportCSV = useCallback(() => {
    gridRef.current?.exportDataAsCsv();
  }, []);

  const exportExcel = useCallback(() => {
    gridRef.current?.exportDataAsExcel();
  }, []);

  /* -----------------------------------------------------
     VALUE FORMATTER
     Chunk 6
  ----------------------------------------------------- */

  const salaryFormatter = useCallback((params) => {
    if (params.value == null) {
      return "";
    }

    return `₹${Number(
      params.value
    ).toLocaleString("en-IN")}`;
  }, []);

  /* -----------------------------------------------------
     VALIDATION
     Chunk 1
  ----------------------------------------------------- */

  const validateSalary = useCallback((params) => {
    const value = Number(params.newValue);

    if (value < 10000) {
      alert("Salary must be at least ₹10,000");

      return false;
    }

    return true;
  }, []);

  /* -----------------------------------------------------
     COLUMN DEFINITIONS
     Chunk 3 - useMemo
  ----------------------------------------------------- */

  const columnDefs = useMemo(() => [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      editable: false,
      pinned: "left",
    },

    {
      field: "name",
      headerName: "Employee Name",
      flex: 1,
      editable: true,

      cellEditor: "agTextCellEditor",

      cellRenderer: (params) => {
        return (
          <strong>
            {params.value}
          </strong>
        );
      },
    },

    {
      field: "department",
      headerName: "Department",
      flex: 1,

      rowGroup: false,
    },

    {
      field: "role",
      headerName: "Role",
      flex: 1,

      editable: true,

      cellEditor: "agSelectCellEditor",

      cellEditorParams: {
        values: [
          "Developer",
          "Frontend Developer",
          "Backend Developer",
          "QA Engineer",
          "Product Manager",
          "Sales Executive",
        ],
      },
    },

    {
      field: "salary",
      headerName: "Salary",
      flex: 1,

      editable: true,

      cellEditor: "agNumberCellEditor",

      valueFormatter: salaryFormatter,

      cellClassRules: {
        "high-salary": (params) =>
          params.value >= 80000,

        "low-salary": (params) =>
          params.value < 40000,
      },

      valueSetter: (params) => {
        const newValue =
          Number(params.newValue);

        if (newValue < 10000) {
          return false;
        }

        params.data.salary = newValue;

        return true;
      },
    },

    {
      field: "status",
      headerName: "Status",
      flex: 1,

      editable: true,

      cellEditor: "agSelectCellEditor",

      cellEditorParams: {
        values: [
          "Active",
          "Inactive",
        ],
      },

      cellRenderer: StatusRenderer,

      cellRendererParams: {
        color: "green",
      },
    },

    {
      field: "email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },

    {
      headerName: "Actions",
      pinned: "right",
      width: 150,

      cellRenderer: ActionRenderer,

      cellRendererParams: {
        onEdit: handleEdit,
        onDelete: handleDelete,
      },
    },
  ], [
    handleEdit,
    handleDelete,
    salaryFormatter,
  ]);

  /* -----------------------------------------------------
     DETAIL GRID
     Chunk 6
  ----------------------------------------------------- */

  const detailCellRendererParams =
    useMemo(() => {
      return {
        detailGridOptions: {
          columnDefs: [
            {
              field: "project",
              headerName: "Project",
              flex: 1,
            },
            {
              field: "hours",
              headerName: "Hours",
              flex: 1,
            },
          ],

          defaultColDef: {
            resizable: true,
          },
        },

        getDetailRowData: (params) => {
          params.successCallback(
            params.data.projects
          );
        },
      };
    }, []);

  /* -----------------------------------------------------
     STATUS BAR
     Chunk 6
  ----------------------------------------------------- */

  const statusBar = useMemo(() => {
    return {
      statusPanels: [
        {
          statusPanel:
            "agTotalAndFilteredRowCountComponent",
        },
        {
          statusPanel:
            "agSelectedRowCountComponent",
        },
      ],
    };
  }, []);

  /* -----------------------------------------------------
     DEFAULT COLUMN
  ----------------------------------------------------- */

  const defaultColDef = useMemo(() => {
    return {
      sortable: true,
      filter: true,
      resizable: true,
      floatingFilter: true,
    };
  }, []);

  /* -----------------------------------------------------
     PAGINATION
     Chunk 5
  ----------------------------------------------------- */

  const paginationPageSize = 5;

  return (
    <AgGridProvider modules={modules}>
      <div className="page">

        <div className="header">
          <div>
            <h1>
              Employee Management
            </h1>

            <p>
              AG Grid React learning project
            </p>
          </div>
        </div>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <div className="toolbar">

          <button onClick={addEmployee}>
            Add Employee
          </button>

          <button onClick={selectAll}>
            Select All
          </button>

          <button onClick={clearSelection}>
            Clear Selection
          </button>

          <button
            onClick={deleteSelected}
            className="delete"
          >
            Delete Selected
          </button>

          <button onClick={exportCSV}>
            Export CSV
          </button>

          <button onClick={exportExcel}>
            Export Excel
          </button>

          <button onClick={fetchEmployees}>
            Reload
          </button>

          <span className="selected">
            Selected: {selectedCount}
          </span>

        </div>

        {loading && (
          <div className="loading">
            Loading employees...
          </div>
        )}

        <div className="grid-wrapper">

          <div className="ag-theme-alpine grid">

            <AgGridReact

              ref={gridRef}

              rowData={rowData}

              columnDefs={columnDefs}

              defaultColDef={defaultColDef}

              onGridReady={onGridReady}

              onSelectionChanged={
                onSelectionChanged
              }

              onCellValueChanged={(event) => {

                console.log(
                  "Old:",
                  event.oldValue
                );

                console.log(
                  "New:",
                  event.newValue
                );

                console.log(
                  "Updated row:",
                  event.data
                );

              }}

              onCellEditingStarted={(event) => {
                console.log(
                  "Editing started:",
                  event.colDef.field
                );
              }}

              onCellEditingStopped={(event) => {
                console.log(
                  "Editing stopped:",
                  event.colDef.field
                );
              }}

              rowSelection={rowSelection}

              pagination={true}

              paginationPageSize={
                paginationPageSize
              }

              paginationPageSizeSelector={[
                5,
                10,
                20,
              ]}

              /* -----------------------------
                 ROW GROUPING
              ----------------------------- */

              autoGroupColumnDef={{
                headerName: "Group",
                minWidth: 200,
              }}

              /* -----------------------------
                 MASTER / DETAIL
              ----------------------------- */

              masterDetail={true}

              detailCellRendererParams={
                detailCellRendererParams
              }

              /* -----------------------------
                 PINNED ROW
              ----------------------------- */

              pinnedTopRowData={[
                {
                  id: "TOTAL",
                  name: "Employee Count",
                  department: `${rowData.length} employees`,
                },
              ]}

              /* -----------------------------
                 STATUS BAR
              ----------------------------- */

              statusBar={statusBar}

              animateRows={true}

              getRowId={(params) =>
                String(params.data.id)
              }

            />

          </div>

        </div>

        <div className="concepts">

          <h2>
            Concepts used
          </h2>

          <div className="concept-list">

            <span>cellRenderer</span>
            <span>cellRendererParams</span>
            <span>cellEditor</span>
            <span>Validation</span>
            <span>Row Selection</span>
            <span>Checkboxes</span>
            <span>useRef</span>
            <span>Grid API</span>
            <span>useMemo</span>
            <span>useCallback</span>
            <span>CRUD</span>
            <span>Pagination</span>
            <span>Row Grouping</span>
            <span>Master / Detail</span>
            <span>Pinned Columns</span>
            <span>Value Formatter</span>
            <span>Conditional Styling</span>
            <span>Status Bar</span>
            <span>CSV Export</span>
            <span>Excel Export</span>

          </div>

        </div>

      </div>
    </AgGridProvider>
  );
}

export default AgGrid;