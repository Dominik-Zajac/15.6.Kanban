$(function() {
  /* ---------- DRAW ID ---------- */
  function randomString() {
    var chars = "0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ";
    var str = "";
    for (var i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() * chars.length)];
    }
    return str;
  }

  /* --------- BOARD ------- */
  function Board(title) {
    var self = this;
    this.id = randomString();
    this.title = title;
    this.$element = createBoard();

    function createBoard() {
      var $board = $("<div>").addClass("board");
      var $boardTitle = $("<h1>")
        .addClass("board-title")
        .text(self.title);

      var $boardDelete = $("<button>")
        .addClass("btn-delete-board")
        .text("Delete board");
      var $boardColumnAdd = $("<button>")
        .addClass("create-column")
        .text("Add a column");
      var $boardColumn = $("<div>").addClass("column-container");

      $boardDelete.click(function() {
        self.removeBoard();
      });

      $boardColumnAdd.click(function(event) {
        var nameColumn = prompt("Enter the name of the column");
        if (nameColumn === "") {
          alert("Give the name of the column!");
        } else {
          self.addColumn(new Column(nameColumn));
          initSortable();
        }
      });

      $board
        .append($boardTitle)
        .append($boardDelete)
        .append($boardColumnAdd)
        .append($boardColumn);

      return $board;
    }
  }

  Board.prototype = {
    addColumn: function(column) {
      this.$element.children("div").append(column.$element);
    },
    removeBoard: function() {
      this.$element.remove();
    }
  };

  /* ---------- COLUMNS ---------- */
  function Column(name) {
    var self = this;
    this.id = randomString();
    this.name = name;
    this.$element = createColumn();

    function createColumn() {
      var $column = $("<div>").addClass("column");
      var $columnTitle = $("<h2>")
        .addClass("column-title")
        .text(self.name);
      var $columnCardList = $("<ul>").addClass("column-card-list");
      var $columnAddCard = $("<button>")
        .addClass("add-card")
        .text("Add a card");
      var $columnDelete = $("<button>")
        .addClass("btn-delete-column")
        .text("Delete column");

      $columnDelete.click(function() {
        self.removeColumn();
      });

      $columnAddCard.click(function(event) {
        var nameCard = prompt("Enter the name of the card");
        if (nameCard === "") {
          alert("Give the name of the card!");
        } else {
          self.addCard(new Card(nameCard));
        }
      });

      $column
        .append($columnTitle)
        .append($columnAddCard)
        .append($columnDelete)
        .append($columnCardList);

      return $column;
    }
  }

  Column.prototype = {
    addCard: function(card) {
      this.$element.children("ul").append(card.$element);
    },
    removeColumn: function() {
      this.$element.remove();
    }
  };

  /* ---------- CARDS ---------- */
  function Card(description) {
    var self = this;
    this.id = randomString();
    this.description = description;
    this.$element = createCard();

    function createCard() {
      var $card = $("<li>").addClass("card");
      var $cardDescription = $("<p>")
        .addClass("card-description")
        .text(self.description);
      var $cardDelete = $("<button>")
        .addClass("btn-delete-card")
        .text("Delete card");

      $cardDelete.click(function() {
        self.removeCard();
      });

      $card.append($cardDescription).append($cardDelete);

      return $card;
    }
  }

  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    }
  };

  /* ---------- New column in the main table ---------- */
  var board = {
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $("#board .column-container")
  };

  $(".create-column").click(function() {
    var nameColumnMainBoard = prompt("Enter a column name");
    if (nameColumnMainBoard === "") {
      alert("Give the name of the board!");
    } else {
      var column = new Column(nameColumnMainBoard);
      board.addColumn(column);
    }
  });

  /* ---------- New board ---------- */
  var table = {
    addBoard: function(table) {
      this.$element.append(table.$element);
      initSortable();
    },
    $element: $("body")
  };

  $(".create-board").click(function() {
    var nameBoard = prompt("Enter a board name");
    if (nameBoard === "") {
      alert("Give the name of the board!");
    } else {
      var board = new Board(nameBoard);
      table.addBoard(board);
    }
  });

  function initSortable() {
    $(".column-card-list")
      .sortable({
        connectWith: ".column-card-list",
        placeholder: "card-placeholder"
      })
      .disableSelection();
  }

  /* ---------- Creating columns ---------- */
  //var todoColumn = new Column('To do');
  //var doingColumn = new Column('Doing');
  //var doneColumn = new Column('Done');

  /* ---------- Adding columns to the board ---------- */
  //board.addColumn(todoColumn);
  //board.addColumn(doingColumn);
  //board.addColumn(doneColumn);

  /* ---------- Creating cards ---------- */
  //var card1 = new Card('New task');
  //var card2 = new Card('Create card');

  /* ---------- Adding cards to column ---------- */
  //todoColumn.addCard(card1);
  //doingColumn.addCard(card2);
});
