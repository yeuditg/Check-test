using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Data.Migrations
{
    /// <inheritdoc />
    public partial class feedback : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "CheckedOn",
                table: "Files",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "FeedbackId",
                table: "Files",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<bool>(
                name: "IsChecked",
                table: "Files",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "StudentsTestFeedbacks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    StudentName = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FinalGrade = table.Column<int>(type: "int", nullable: false),
                    NoteToTeacher = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentsTestFeedbacks", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "QuestionFeedback",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    QuestionNumber = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Feedback = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CorrectAnswer = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StudentTestFeedbackId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionFeedback", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionFeedback_StudentsTestFeedbacks_StudentTestFeedbackId",
                        column: x => x.StudentTestFeedbackId,
                        principalTable: "StudentsTestFeedbacks",
                        principalColumn: "Id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Files_FeedbackId",
                table: "Files",
                column: "FeedbackId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionFeedback_StudentTestFeedbackId",
                table: "QuestionFeedback",
                column: "StudentTestFeedbackId");

            migrationBuilder.AddForeignKey(
                name: "FK_Files_StudentsTestFeedbacks_FeedbackId",
                table: "Files",
                column: "FeedbackId",
                principalTable: "StudentsTestFeedbacks",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Files_StudentsTestFeedbacks_FeedbackId",
                table: "Files");

            migrationBuilder.DropTable(
                name: "QuestionFeedback");

            migrationBuilder.DropTable(
                name: "StudentsTestFeedbacks");

            migrationBuilder.DropIndex(
                name: "IX_Files_FeedbackId",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "CheckedOn",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "FeedbackId",
                table: "Files");

            migrationBuilder.DropColumn(
                name: "IsChecked",
                table: "Files");
        }
    }
}
